import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import Pusher from "pusher-js";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();
  const [rooms, setRooms] = useState([]);

  const isLoggedIn = sessionStorage.getItem("token");
  console.log(isLoggedIn);
  const sessionUser = localStorage.getItem("user");
  console.log(sessionUser);

  useEffect(() => {
    axios.get("/rooms/sync").then((response) => {
      setRooms(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("119fa00b5b664f824337", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", (newRoom) => {
      console.log("--------> " + newRoom._id);
      setRooms([...rooms, newRoom]);
      axios.get("/rooms/sync").then((response) => {
        setRooms(response.data);
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  // console.log(rooms);
  return (
    <div className="app">
      {!user && !isLoggedIn ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar rooms={rooms} />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <h1>Please select a room...</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}
export default App;
