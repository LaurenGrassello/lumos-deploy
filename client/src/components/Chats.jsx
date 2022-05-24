import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chats({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                user: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
        <h3 className="logo">{room}</h3>
            <div className="chat-header">
                <h5 className="logo" style={{color:'#bc9f06'}}>Lumos Live Chat</h5>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div>
                            <div
                                className="message"
                                id={username === messageContent.user ? 
                                    "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="user">{messageContent.user}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Alohomora..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button className="btn-flat waves-effect" style={{ textDecoration: 'none', color: '#bc9f06' }} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chats;