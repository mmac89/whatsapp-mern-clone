import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import axios from './axios'

function SidebarChat({ addNewChat, room, roomId }) {

    const roomClicked= () => {
        alert('click')        
    }

    const [seed, setSeed] = useState('');

    useEffect(() => {
          setSeed(Math.floor(Math.random() *5000)) 
    }, [])

    const createChat = async() =>{
        const roomName = prompt('Please enter a name for the chat');

        if (roomName){
            //do some clever db stuff...
            await axios.post('/rooms/new',{
                roomName: roomName,
            });

        
        }
    };
    
    
    return !addNewChat ? (
        <Link to="/:roomId">
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='sidebarChat__info' onClick={roomClicked}>
                    <h2>{room.roomName}</h2>
                    <p>the last message...</p>
                </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat}
            className='sidebarChat'>
            <h2>Add new chat</h2>
        </div>    
    )
}

export default SidebarChat
