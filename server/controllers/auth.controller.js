import { connect } from 'getstream';
import bcrypt from 'bcrypt';
import { StreamChat } from 'stream-chat';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

export const register = async (req, res) => {
    try {
        const { fullName, username, phoneNumber, password } = req.body;

        // Create a random crypto string with 16 hex.
        const userId = crypto.randomBytes(16).toString('hex');
        // console.log(userId);
        // Connection to stream chat.
        const serverClient = connect(api_key, api_secret, api_id);

        const hashedPassword = await hashPassword(password);

        // TODO: create a user model and store it in mongoDB

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, api_id);

    const client = StreamChat.getInstance(api_key, api_secret);

    // TODO: for future improvement could use email to query instead of username
    const { users } = await client.queryUsers({ name: username });
    // console.log(users);
    if (!users.length) return res.status(404).json({ message: 'User not found' });

    const isSuccess = await validatePassword(password, users[0].hashedPassword);

    if (isSuccess) {
        const token = serverClient.createUserToken(users[0].id);
        res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
    } else {
        res.status(500).json({ error: 'Invalid credentials' });
    }
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
