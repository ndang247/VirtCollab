import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer, Auth } from "./components";
import "stream-chat-react/dist/css/index.css";
import "./App.css";

const cookies = new Cookies();

const apiKey = 'bwqd2q8jpynq';
const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get('token');

// Connect the user.
if (authToken) {
  const connect = async () => {
    await client.connectUser({
      id: cookies.get('userId'),
      fullName: cookies.get('fullName'),
      name: cookies.get('username'),
      phoneNumber: cookies.get('phoneNumber'),
      image: cookies.get('avatar'),
      hashedPassword: cookies.get('hashedPassword')
    }, authToken);
  }
  connect();
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
