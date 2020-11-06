import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert } from "@material-ui/icons";
import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";

function Sidebar({ rooms }) {
  const [{ user }] = useStateValue();

  console.log(rooms);

  //   useEffect(() => {
  //     for (const room of rooms) {
  //       console.log(room.roomMessages[room.roomMessages.length - 1].message);
  //     }
  //   }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text" />
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
