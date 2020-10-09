import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Login from './Login'
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [user, setUSer] = useState(null);
  const[messages, setMessages] = useState([]);

  useEffect (() => {
    axios.get('/messages/sync')
    .then(response => {
      
      setMessages(response.data);
    })
  }, [])

  useEffect( () => {
    
    const pusher = new Pusher('119fa00b5b664f824337', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return ()=>{
     
    }
    
  }, [messages])

  const[rooms, setRooms] = useState([]);

  useEffect (() => {
    axios.get('/rooms/sync')
    .then(response => {
      
      setRooms(response.data);
    
    })
  }, [])


  useEffect( () => {
    
    const pusher = new Pusher('119fa00b5b664f824337', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('rooms');
    channel.bind('inserted', (newRoom) => {
      //alert(JSON.stringify(newMessage));
      setRooms([...rooms, newRoom]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
    
  }, [rooms])

  
  
  //console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ): (
        <div className='app__body'>
          <Router>
            <Switch>

              <Route path="/rooms/:roomId" >
                <Sidebar rooms={rooms} /> 
                <Chat messages={messages}/>
              </Route>

              <Route path="/" > 
                <Sidebar rooms={rooms} />
                {/* <Chat messages={messages}/> */}
                <h1>home</h1>
              </Route> 

            </Switch>
          </Router>
        </div>
      )}
      </div>
  );
}

export default App;
