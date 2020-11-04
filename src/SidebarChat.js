import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import axios from "./axios";
import Pusher from "pusher-js";

function SidebarChat({ addNewChat, room, roomId }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  console.log(room);

  const createChat = async () => {
    const roomName = prompt("Please enter a name for the chat");

    if (roomName) {
      await axios.post("/rooms/new", {
        roomName: roomName,
      });
    }
  };

  const [lastMessage, setLastMessage] = useState("");
  useEffect(() => {
    const pusher = new Pusher("119fa00b5b664f824337", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("updated", (message) => {
      //   console.log(message);
      // console.log(message.roomMessages[message.roomMessages.length-1]);
      setLastMessage(message.roomMessages[message.roomMessages.length - 1]);

      //   console.log(lastMessage);
    });
  }, [lastMessage]);

  //   console.log(lastMessage.message);

  return !addNewChat ? (
    <Link to={`/rooms/${roomId}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{room.roomName}</h2>
          <p>{lastMessage.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
