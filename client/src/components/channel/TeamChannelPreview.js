import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ channel, type, setToggleContainer, setIsCreating, setIsEditing, setActiveChannel }) => {
    const { channel: activeChannel, client } = useChatContext();

    // For team.
    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );

    // For direct message.
    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
        console.log(members[0]?.user?.id);
        return (
            <div className="channel-preview__item single">
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        );
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
            onClick={() => {
                setActiveChannel(channel);
                setIsCreating(false);
                setIsEditing(false);

                if (setToggleContainer) setToggleContainer((prevState) => !prevState)
            }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
}

export default TeamChannelPreview;