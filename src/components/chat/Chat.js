import React from 'react'
import { nanoid } from 'nanoid'
import './Chat.css'

const Chat = ({ username, room, messages, setMessages, socket }) => {
    const [currentMessage, setCurrentMessage] = React.useState('')

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const time = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            setMessages([...messages, [currentMessage, username, time]])
            setCurrentMessage('')
            const messageData = {
                username: username,
                room: room,
                message: currentMessage,
                time: time
            }
            await socket.emit('send_message', messageData)
        }
    }
    socket.on('receive_message', (data) => {
        setMessages([...messages, [data.message, data.username, data.time]])
    })

    const chatMessages = messages.map(message => (

        <div key={nanoid()} className={message[1] === username ? 'message-by-you message-by-anyone' : 'message-by-someone message-by-anyone'}>
            <div>
                <div className='message-username'>
                    {message[1]}
                </div>
                {`${message[0]}`}
                <div className='message-time'>
                    {message[2]}
                </div>
            </div>
        </div >


    ))

    return (
        <section className='chat-window'>
            <div className='room-heading'>Current Room: {room}</div>
            <div className='chat-messages'>
                {chatMessages}
            </div>
            <section className='chat-block'>
                <input className='chat-input' onChange={(event) => { setCurrentMessage(event.target.value) }} value={currentMessage} placeholder='Hey!' />
                <button onClick={sendMessage} className='send-button'>&#8594;</button>
            </section>
        </section>
    )
}

export default Chat