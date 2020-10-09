import React, { useState, useEffect } from 'react' 
import './Chat.css'

import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import InsertEmoticonIcon  from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import axios from './axios'
import { useParams } from 'react-router-dom';


function Chat( { messages } ) {

    const [input, setInput] = useState('');
   
    const [roomName, setRoomName] = useState('');

    const {roomId } =useParams();




    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: 'Demo App',
            timestamp: 'just now',
            received: false,
        });

        setInput('');
    }

    
    
    const [seed, setSeed] =useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() *5000)) 
    }, [])

    useEffect( () => {


        axios.get(`/getRoomName/${roomId}`)
        .then(response => {
            console.log(response);
            setRoomName(response.data);
        }).catch(() => {
            alert('error retrieving data');
        })

        setSeed(Math.floor(Math.random() *5000));
        
    }, [roomId])


    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className='chat__headerRight'>
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>

            </div>
            <div className='chat__body' >
                {messages.map((message) => (
                    <p className={`chat__message ${message.received && 'chat__receiver'} `}>
                        <span className='chat__name'> 
                            {message.name}
                        </span>
                        {message.message}
                        <span className='chat__timestamp'>   
                            {message.timestamp}
                        </span>
                    </p>
                ))}
               
            </div>

            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form >
                    <input 
                        value={input}
                        placeholder='Type a message' type='text' 
                        onChange={e =>setInput(e.target.value)}
                    />
                    <button 
                        onClick={sendMessage} 
                        type='submit'>
                        Send 
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
