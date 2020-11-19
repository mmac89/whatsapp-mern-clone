import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert } from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

function Sidebar({ rooms }) {
  const photoURL = localStorage.getItem("photoURL");
  const handleClick = () => {
    alert("feature is under construction");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={photoURL} />
        <div className="sidebar__headerRight">
          <IconButton onClick={handleClick}>
            <DonutLarge />
          </IconButton>
          <IconButton onClick={handleClick}>
            <Chat />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat room={room} roomId={room._id} key={room._id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
