import React, { useState, useEffect } from 'react' 
import './Chat.css'

import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import InsertEmoticonIcon  from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import Pusher from 'pusher-js'
import axios from './axios'
import { useParams } from 'react-router-dom';


function Chat(  ) {

    const [input, setInput] = useState('');
   
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [user] = useState('');
    const {roomId } =useParams();

   let [roomMessage]=useState('');
   const[rooms, setRooms] = useState([]);




  useEffect( () => {
    
    const pusher = new Pusher('119fa00b5b664f824337', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('rooms');
    channel.bind('updated', (updatedRoom) => {
      setRooms([...rooms, updatedRoom]);
    });

    return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
    }
    
  }, [rooms])


    const sendMessage = async (e) => {
        e.preventDefault();

        let date = new Date();
        await axios.post(`/messages/${roomId}/new`, {
            message: input,
            name: user.displayName,
            timestamp: date,
            received: false,
            roomId: roomId,
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
            const room = response.data;
            console.log(room);
            setRoomName(room.roomName);

            setMessages(room.roomMessages);
            
        }).catch(() => {
            alert('error retrieving data');
        })

        
    }, [roomId])

    
  useEffect (() => {
    axios.get(`/messages/${roomId}/sync`)
    .then(response => {
      console.log(response.data)
      setMessages(response.data);
    })
  }, [])
   
    // useEffect(() => {
    //     roomMessage= messages.map( (message) =>{
    //         if(message.roomId === roomId) {
    //             roomMessage+=message;
    //             return roomMessage;
    //         }
    //         })
    //         console.log(roomMessage);
      
    // }, [])
    

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() *5000)}.svg`}/>
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
