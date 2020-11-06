import React from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import SidebarRooms from "./SidebarRooms";
import axios from "./axios";
// import Pusher from "pusher-js";

function SidebarChat({ addNewChat, room, roomId }) {
  // const [seed, setSeed] = useState("");

  // useEffect(() => {
  //   setSeed(Math.floor(Math.random() * 5000));
  // }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter a name for the chat");

    if (roomName) {
      await axios.post("/rooms/new", {
        roomName: roomName,
      });
    }
  };

  // const [lastMessage, setLastMessage] = useState("");
  // useEffect(() => {
  //   const pusher = new Pusher("119fa00b5b664f824337", {
  //     cluster: "us3",
  //   });

  //   const channel = pusher.subscribe("rooms");
  //   channel.bind("updated", (message) => {
  //     //   console.log(message);
  //     //   lastMessage = message.roomMessages[message.roomMessages.length - 1];
  //     setLastMessage(message.roomMessages[message.roomMessages.length - 1]);

  //     //   console.log(lastMessage);
  //   });
  // }, [lastMessage]);

  // console.log(lastMessage);

  return !addNewChat ? (
    <Link to={`/rooms/${roomId}`}>
      <SidebarRooms room={room} roomId={roomId} />
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
