import React from 'react'
import './RoomSelector.css'

const RoomSelector = ({ username, setUsername, room, setRoom, socket, setJoined }) => {
    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit('join_room', username, room)
            setJoined(true)
        }
    }

    return (
        <div className='room-selection-window'>
            <input className='chat-input-room' onChange={(event) => { setUsername(event.target.value) }} placeholder='Username' />
            <input className='chat-input-room' onChange={(event) => { setRoom(event.target.value) }} placeholder='Room' />
            <button onClick={joinRoom} className='join-room-button'> Submit</button>
        </div>
    )
}

export default RoomSelector

