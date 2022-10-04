import React from 'react';
import './App.css';
import RoomSelector from './components/room/RoomSelector'
import Chat from './components/chat/Chat'
import io from 'socket.io-client'

function App() {

  const [username, setUsername] = React.useState('')
  const [room, setRoom] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const [joined, setJoined] = React.useState(false)
  const [socket, setSocket] = React.useState(io.connect('http://172.16.218.231:8080'))
  console.log(messages)
  return (
    <div className="App">
      {!joined ?
        <RoomSelector
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          socket={socket}
          setJoined={setJoined}
        /> :
        <Chat
          username={username}
          room={room}
          messages={messages}
          setMessages={setMessages}
          socket={socket}
        />}
    </div>
  );
}

export default App