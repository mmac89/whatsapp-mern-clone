import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarRooms.css";
import Pusher from "pusher-js";

function SidebarRooms({ room, roomId }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const [lastMessage, setLastMessage] = useState(
    room.roomMessages[room.roomMessages.length - 1]
  );
  useEffect(() => {
    const pusher = new Pusher("119fa00b5b664f824337", {
      cluster: "us3",
    });

    // setLastMessage(room.roomMessages[room.roomMessages.length - 1].message);

    const channel = pusher.subscribe("rooms");
    channel.bind("updated", (message) => {
      //   console.log(message);
      //   lastMessage = message.roomMessages[message.roomMessages.length - 1];
      const messageId =
        message.roomMessages[message.roomMessages.length - 1].roomId;
      if (messageId === roomId) {
        setLastMessage(message.roomMessages[message.roomMessages.length - 1]);
      }

      //   console.log(roomId);
      //   console.log(lastMessage.message);

      //   console.log(lastMessage.roomId);
    });
  }, [lastMessage, roomId]);

  console.log(lastMessage);
  return (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>{room.roomName}</h2>
        <p>{lastMessage.message}</p>
      </div>
    </div>
  );
}

export default SidebarRooms;
