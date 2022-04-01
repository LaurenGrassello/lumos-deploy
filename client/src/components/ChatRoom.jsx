import io from "socket.io-client";
import React, { useState } from "react";
import { Link} from 'react-router-dom'
import Chats from "./Chats";

const socket = io.connect("http://localhost:4000");

function App() {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [chat, setChat] = useState(false);

    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join_room", room);
            setChat(true);
        }
    };


    return (
        <div className="App">
            <nav className='nav'>
                <Link className="btn-flat waves-effect" style={{ textDecoration: 'none', color: '#bc9f06' }} to='/'>Return Home</Link>
            </nav>

            {!chat ? (

                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <h3 className="logo">Lumos Chat</h3>
                    
                        <input
                            type="text"
                            placeholder="Enter username"
                            onChange={(event) => {
                                setUserName(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Enter Hogwarts House"
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}
                        />
                        <button className="btn-flat waves-effect" style={{ textDecoration: 'none', color: '#bc9f06' }} onClick={joinRoom}>Join Room</button>
                    </div>
                </div>
            ) : (
                <Chats socket={socket} username={userName} room={room} />
            )}
        </div>
    );
}

export default App;

