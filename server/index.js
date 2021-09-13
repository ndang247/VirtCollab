import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import twilio from 'twilio';

const app = express();
dotenv.config();

const twilioAccSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioMessagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const twilioClient = new twilio(twilioAccSID, twilioAuthToken);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send('VirtCollab APIs is running.'));

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;

    if (type === 'message.new') {
        members.filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if (!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: twilioMessagingServiceSid,
                        to: user.phoneNumber
                    })
                        .then(() => console.log('Message sent!'))
                        .catch((err) => console.log(err));
                }
            })
        return res.status(200).send('Message sent!');
    }
    return res.status(200).send('Not a new message request');
});

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
