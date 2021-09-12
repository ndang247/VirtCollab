import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { InviteIcon } from 'src/assets';

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            {/* <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div> */}
            {children}
        </div>
    );
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false);

    const handleChange = () => {
        // When deselected filter the array else add in the user id.
        if (selected) setSelectedUsers((userIds) => userIds.filter((userId) => userId !== user.id));
        else setSelectedUsers((userIds) => [...userIds, user.id]);

        setSelected((prevSelected) => !prevSelected);
    }

    return (
        <div className="user-item__wrapper" onClick={handleChange}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
        </div>
    );
}

const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isListEmpty, setIsListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setLoading(true);
            try {
                // Query all users except ourself or the client.
                const response = await client.queryUsers({
                    id: { $ne: client.userID }
                }, { id: 1 }, { limit: 8 });

                if (response.users.length) setUsers(response.users);
                else setIsListEmpty(true);

            } catch (error) {
                setError(true);
                console.log(error);
            }
            setLoading(false);
        }

        if (client) getUsers();
    }, []);

    if (error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, pleaser refresh and try agian.
                </div>
            </ListContainer>
        );
    }

    if (isListEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        );
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading user...
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    );
}

export default UserList;
