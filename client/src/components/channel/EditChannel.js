import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { UserList, ChannelNameInput } from 'src/components';
import { CloseCreateChannel } from 'src/assets';

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const updateChannel = async (e) => {
        e.preventDefault();

        if (channelName !== (channel?.data?.name || channel?.data?.id)) {
            await channel.update({
                name: channelName
            }, {
                text: `Channel name changed to ${channelName}`
            });
        }
        if (selectedUsers.length) await channel.addMembers(selectedUsers);

        setIsEditing(false);
        setChannelName(null);
        setSelectedUsers([]);
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    );
}

export default EditChannel;
