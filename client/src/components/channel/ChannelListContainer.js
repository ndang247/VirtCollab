import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {
    ChannelSearch, TeamChannelList, TeamChannelPreview, SideBar,
    CompanyHeader
} from 'src/components';

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setIsEditing, setCreateType, setToggleContainer }) => {
    const { client } = useChatContext();

    // Get all the channels and direct messages where the current logged in user is included.
    const filters = { members: { $in: [client.userID] } }

    return (
        <>
            <SideBar />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch />
                {/* Channel list for group */}
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                {/* Channel list for direct */}
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ isCreating, setIsCreating, setIsEditing, setCreateType }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                />
            </div>
            {/* For mobile responsive */}
            <div
                className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    );
}

export default ChannelListContainer;
