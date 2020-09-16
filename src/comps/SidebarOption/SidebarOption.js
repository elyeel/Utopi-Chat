import React, { useEffect, useState } from "react";
import "./SidebarOption.scss";
import { useHistory } from "react-router-dom";
// import db from "../../firebase";

function SidebarOption({
  Icon,
  title,
  id,
  addChannelOption,
  currChannel,
  setCurrChannel,
  cookies,
  db,
}) {
  const history = useHistory();
  const [numUsers, setNumUsers] = useState(0);

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
      // check # of users online on this channel
      db.collection("channelUsers")
        .doc(id)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          if (!arrUsers.some((e) => e === cookies.user.id)) {
            arrUsers.push(cookies.user.id);
            db.collection("channelUsers")
              .doc(id)
              .update({ users: arrUsers })
              .then(() => setNumUsers(arrUsers.length))
              .catch((error) =>
                console.error("Error in updating the array of users!")
              );
          }
          db.collection("channelUsers")
            .doc(id)
            .onSnapshot((snaps) => setNumUsers(snaps.data().users.length));
          setCurrChannel((prev) => {
            if (prev !== null) {
              console.log("prev = ", prev);
              // set previous channel users decrease by 1
              db.collection("channelUsers")
                .doc(prev)
                .get()
                .then((doc) => {
                  const newArr = doc.data().users;
                  db.collection("channelUsers")
                    .doc(prev)
                    .update({
                      users: newArr.filter((cid) => cid !== cookies.user.id),
                    });
                });
            }
            // set current channel to current
            return id;
          });
          // doc.data().users.push(cookies.user.id);
          // console.log(doc.data());
        })
        .catch((error) =>
          console.error("Error in pushing a users into array", error)
        );
    } else {
      history.push("title");
    }

    // usersArr.push(cookies.user.id);
    // db.collection("channelUsers")
    //   .doc(id)
    //   .update({ users: usersArr })
    //   .then(() => console.log("Users array updated"))
    //   .catch((error) => console.error("Error in updating", error));
    // });

    // db.collection("users")
    //   .doc(cookies.user.id)
    //   .update({ channelId: id })
    //   .then((doc) => console.log("User updated ", doc))
    //   .catch((error) => console.error("Error updating User", error));

    // .then((users) => {
    //   // const test = users;
    //   // console.log(users);
    // })
    // .catch((error) => console.error("Can't get channel users data", error));
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("channels").add({
        name: channelName,
      });
      db.collection("channelUsers")
        .doc(id)
        .set({
          id,
          users: [],
        })
        .then((doc) => console.log(doc))
        .catch((error) =>
          console.error("Error adding online users by channel", error)
        );
    }
  };

  // const usersOnline = () => {
  //   let num = 0;
  //   db.collection("channelUsers")
  //     .doc(id)
  //     .onSnapshot((snaps) => {
  //       num = snaps.data().users.length;
  //       setNumUsers(snaps.data().users.length);
  //     });
  //   return num;
  // };

  return (
    <>
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
            {id && <span className="sidebarOption__numUsers">{numUsers}</span>}
          </h3>
        )}
      </div>
    </>
  );
}

export default SidebarOption;
