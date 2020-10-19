import React, { useEffect, useState } from "react";
import "./SidebarOption.scss";
import db from "../../firebase";
import click from "./graceful.mp3";
import useSidebarOption from "../hooks/sidebarOptHooks";
// import { useHistory } from "react-router-dom";

function SidebarOption({
  Icon,
  title,
  id,
  addChannelOption,
  currChannel,
  changeLanguage,
  setCurrChannel,
  cookies,
  setCookie,
}) {
  const [numUsers, setNumUsers] = useState(0);
  const [favChannel, setFavChannel] = useState(false);
  // const [isSelect, setIsSelect] = useState(true);
  // const history = useHistory();

  let clickAudio = new Audio(click);
  const { addChannel, selectChannel } = useSidebarOption({
    id: id,
    cookies: cookies,
    setCookie: setCookie,
    setCurrChannel: setCurrChannel,
    setNumUsers: setNumUsers,
    numUsers: numUsers,
    currChannel: currChannel,
  });

  const playSound = (audioFile) => {
    audioFile.play();
  };
  // notification block v0.3
  useEffect(() => {
    const localDb = JSON.parse(localStorage.getItem(id));

    if (favChannel && localDb && localDb.length > 0) {
      const newMsgOnFavChannel = db
        .collection("channels")
        .doc(id)
        .collection("messages")
        .onSnapshot((snapshot) => {
          console.log(snapshot.docs.length, localDb.length, favChannel);
          if (snapshot.docs.length > localDb.length && favChannel) {
            // console.log("Increased, snaps = ", id);
            // console.log(snapshot.docChanges());
            snapshot.docChanges().forEach((change) => {
              // console.log("Playsound");
              if (change.type === "added") playSound(clickAudio);
            });
          }
        });
      return function cleanup() {
        newMsgOnFavChannel();
      };
      // db.collection("channels")
      //   .doc(id)
      //   .collection("messages")
      //   .onSnapshot((snapshot) => {
      //     console.log(snapshot.docs.length, localDb.length, favChannel);
      //     if (snapshot.docs.length > localDb.length && favChannel) {
      //       // console.log("Increased, snaps = ", id);
      //       // console.log(snapshot.docChanges());
      //       snapshot.docChanges().forEach((change) => {
      //         // console.log("Playsound");
      //         if (change.type === "added") playSound(clickAudio);
      //       });
      //     }
      //   });
    }
  }, [favChannel]);

  // notification feature with local storage comparison
  useEffect(() => {
    // let favChannel = false;
    if (id) {
      console.log("db readout");
      db.collection("favouriteChannels")
        .doc(cookies.user.id)
        .onSnapshot((snapsFav) => {
          setFavChannel(
            snapsFav.data().channels.some((channel) => channel === id)
          );
        });
    }
  });
  useEffect(() => {
    window.addEventListener("beforeunload", function () {
      console.log("hello");
      db.collection("channelUsers")
        .doc(id)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          db.collection("channelUsers")
            .doc(id)
            .update({ users: arrUsers.filter((e) => e !== cookies.user.id) });
        });
    });

    return window.removeEventListener("beforeunload", function () {
      db.collection("channelUsers")
        .doc(id)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          db.collection("channelUsers")
            .doc(id)
            .update({ users: arrUsers.filter((e) => e !== cookies.user.id) });
        });
    });
  }, [id]);

  return (
    <div
      className={
        currChannel === id && !addChannelOption
          ? "sidebarOption__selected"
          : "sidebarOption"
      }
      onClick={
        addChannelOption
          ? addChannel
          : changeLanguage
          ? changeLanguage
          : selectChannel
      }
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>
          {title}
          {id && (
            <span className="sidebarOption__numUsers">
              {numUsers > 0 ? numUsers : ""}
            </span>
          )}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
