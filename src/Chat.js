import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Pusher from "pusher-js";
import axios from "./axios";
import { useParams } from "react-router-dom";

function Chat() {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const displayName = localStorage.getItem("displayName");

  const handleClick = () => {
    alert("feature is under construction");
  };

  useEffect(() => {
    axios
      .get(`/getRoomName/${roomId}`)
      .then((response) => {
        const room = response.data;
        setRoomName(room.roomName);
        setSeed(Math.floor(Math.random() * 5000));
        setMessages(room.roomMessages);
      })
      .catch(() => {
        alert("error retrieving data");
      });
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let name = displayName;
    let date = new Date();
    date = date.toLocaleString();
    await axios.post(`/messages/${roomId}/new`, {
      message: input,
      name: name,
      timestamp: date,
      sent: true,
      roomId: roomId,
    });
    setInput("");
  };

  useEffect(() => {
    const pusher = new Pusher("119fa00b5b664f824337", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("updated", (message) => {
      const newMessage = message.roomMessages[message.roomMessages.length - 1];
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp
            )?.toLocaleString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton onClick={handleClick}>
            <SearchOutlined />
          </IconButton>
          <IconButton onClick={handleClick}>
            <AttachFile />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <div className="chat__messageContainer">
            <p
              className={`chat__message ${message.sent && "chat__sender"} `}
              key={message.timestamp}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton onClick={handleClick}>
          <InsertEmoticonIcon />
        </IconButton>
        {/* {emoji ? <Picker onSelect={addEmoji} /> : null} */}
        <form>
          <input
            value={input}
            placeholder="Type a message"
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
