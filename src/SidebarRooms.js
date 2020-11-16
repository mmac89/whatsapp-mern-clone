import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarRooms.css";
import Pusher from "pusher-js";

function SidebarRooms({ room, roomId }) {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState(room.roomMessages);
  let isLastMessage;
  if (lastMessage.length === 0) {
    isLastMessage = "";
  } else {
    isLastMessage = lastMessage[lastMessage.length - 1].message;
    if (isLastMessage.length > 25) {
      isLastMessage = isLastMessage.substr(0, 25);
      isLastMessage = isLastMessage + " ...";
    }
  }

  //   let newMessage;
  //   if (lastMessage) {
  //     newMessage = lastMessage.message;
  //   } else {
  //     newMessage = "";
  //   }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  //   useEffect(() => {
  //     const AreThereMessages =
  //       room.roomMessages[room.roomMessages.length - 1].message;
  //   }, []);

  useEffect(() => {
    const pusher = new Pusher("119fa00b5b664f824337", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("updated", (message) => {
      //   console.log(message);
      //   lastMessage = message.roomMessages[message.roomMessages.length - 1];
      const messageId =
        message.roomMessages[message.roomMessages.length - 1].roomId;
      if (messageId === roomId) {
        setLastMessage(message.roomMessages);
        if (lastMessage.length > 0) {
          isLastMessage = lastMessage[lastMessage.length - 1].message;
        } else {
          isLastMessage = "";
        }
      }

      //   console.log(roomId);
      //   console.log(lastMessage.message);

      //   console.log(lastMessage.roomId);
    });

    channel.bind("inserted", (newRoom) => {
      if (newRoom._id === roomId) {
        isLastMessage = "";
      }
    });
  }, [lastMessage, roomId, isLastMessage]);

  return (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>{room.roomName}</h2>
        <p>{isLastMessage}</p>
      </div>
    </div>
  );
}

export default SidebarRooms;
