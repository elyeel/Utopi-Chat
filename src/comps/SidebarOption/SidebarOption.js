import React, { useEffect, useState } from "react";
import "./SidebarOption.scss";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import click from "./graceful.mp3";

function SidebarOption({
  Icon,
  title,
  id,
  addChannelOption,
  currChannel,
  changeLanguage,
  setCurrChannel,
  cookies,
}) {
  const history = useHistory();
  const [numUsers, setNumUsers] = useState(0);
  // const [isSelect, setIsSelect] = useState(true);
  const clickAudio = new Audio(click);

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
      // check # of users online on this channel
      db.collection("channelUsers")
        .doc(id)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          // if user not in the channel users array then add user into the channel user array
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
          // db.collection("channelUsers")
          //   .doc(id)
          //   .onSnapshot((snaps) => setNumUsers(snaps.data().users.length));

          // if prev channel != null && != id => push user's id into users(array,doc) then setCurrChannel with current channel
          setCurrChannel((prev) => {
            if (prev !== null && prev !== id) {
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
      db.collection("channels")
        .add({
          name: channelName,
        })
        .then((docRef) => {
          console.log("docRef :", docRef.id);
          db.collection("channelUsers")
            .doc(docRef.id)
            .set({
              id: docRef.id,
              users: [],
            })
            .then((doc) => console.log(doc))
            .catch((error) =>
              console.error("Error adding online users by channel", error)
            );
        })
        .catch((error) => console.error("Error in adding new channel", error));

      addChannelOption = false;
    }
  };

  const initNumUsers = () => {
    // useEffect here? to reduce calls to firebase
    // console.log("calls", id);
    db.collection("channelUsers")
      .doc(id)
      .onSnapshot((snaps) => {
        if (snaps.data()) setNumUsers(snaps.data().users.length);
      });
    if (numUsers > 0)  return numUsers;
  };
  
  // notification feature with local storage comparison
  useEffect(() => {
    let favChannel = false;
    const localDb = JSON.parse(localStorage.getItem(id));
    if (id && localDb && localDb.length > 0) {
      db.collection("favouriteChannels")
        .doc(cookies.user.id)
        .get()
        .then((channels) => {
          favChannel = channels
            .data()
            .channels.some((channel) => channel === id);
        })
        .then(() => {
          db.collection("channels")
            .doc(id)
            .collection("messages")
            .onSnapshot((snapshot) => {
              console.log(snapshot.docs.length, localDb.length, favChannel);
              if (snapshot.docs.length > localDb.length && favChannel) {
                console.log("Increased, snaps = ", id);
                console.log(snapshot.docChanges());
                snapshot.docChanges().forEach((change) => {
                  console.log("Playsound");
                  if (change.type === "added") playSound(clickAudio);
                });
              } else console.log("The Same");

              // if (snapshot.metadata.fromCache) playSound(clickAudio);
              // let cache = snapshot.metadata.fromCache
              // console.log("Data came from ", cache)
            });
        });
    }
  }, [id]);

  useEffect(()=> {
    window.addEventListener('beforeunload', function() {
      console.log('hello');
      db.collection("channelUsers")
      .doc(id)
      .get()
      .then((doc) => {
        const arrUsers = doc.data().users;
        db.collection("channelUsers")
          .doc(id)
          .update({ users: arrUsers.filter((e) => e !== cookies.user.id) });
      });
    })


    
    return window.removeEventListener('beforeunload', function() {
      db.collection("channelUsers")
      .doc(id)
      .get()
      .then((doc) => {
        const arrUsers = doc.data().users;
        db.collection("channelUsers")
          .doc(id)
          .update({ users: arrUsers.filter((e) => e !== cookies.user.id) });
      });
    })
  },[])

  useEffect(() => {
    if (id) {
      const tempArr = [];
      db.collection("channels")
        .doc(id)
        .collection("messages")
        .get()
        .then((msgs) => {
          for (let msg of msgs.docs) {
            tempArr.push({
              messageId: msg.id,
              message: msg.data().message,
              timestamp: msg.data().timestamp.toDate(),
              user: msg.data().user,
              userimage: msg.data().userimage,
            });
          }
        })
        .then(() => localStorage.setItem(id, JSON.stringify(tempArr)));
    }
  });

  const playSound = (audioFile) => {
    audioFile.play();
  };
  // onClick={() => playSound(clickAudio)}
  return (
    <>
      <div
        className="sidebarOption"
        onClick={addChannelOption ? addChannel : (changeLanguage ? changeLanguage : selectChannel)}
      >
        {Icon && <Icon className="sidebarOption__icon"/>}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <h3 className="sidebarOption__channel">
            <span className="sidebarOption__hash">#</span>
            {title}
            {id && (
              <span className="sidebarOption__numUsers">{initNumUsers()}</span>
            )}
          </h3>
        )}
      </div>
    </>
  );
}

export default SidebarOption;
