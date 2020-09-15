import React from "react";
import "./SidebarOption.scss";
import { useHistory } from "react-router-dom";
// import db from "../../firebase";

function SidebarOption({
  Icon,
  title,
  id,
  addChannelOption,
  onlineUsers,
  setOnlineUsers,
  cookies,
  db,
}) {
  const history = useHistory();

  // const checkUser = (name) => {
  //   if (onlineUsers.findIndex(elem => elem.name === name) < 0) {
  //     setOnlineUsers([
  //       ...onlineUsers,
  //       {
  //         name: cookies.user.name,
  //         picture: cookies.user.picture,
  //         locale: cookies.user.locale,
  //       },
  //     ]);
  //   }
  // }

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
    } else {
      history.push("title");
    }
    // if (onlineUsers.length < 1) {
    //   setOnlineUsers([
    //     {
    //       name: cookies.user.name,
    //       picture: cookies.user.picture,
    //       locale: cookies.user.locale,
    //     },
    //   ]);
    // } else {
    //   checkUser(cookies.user.name);
    // }
    db.collection("users")
      .doc(cookies.user.id)
      .update({ channelId: id })
      .then((doc) => console.log("User updated ", doc))
      .catch((error) => console.error("Error updating User", error));
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("channels").add({
        name: channelName,
      });
    }
  };

  return (
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
