import React, { useEffect, useState } from "react";
import "./SidebarOption.scss";
import db from "../../firebase";
import click from "./graceful.mp3";
import useSidebarOption from "../hooks/sidebarOptHooks";

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

  // notification block v0.3
  useEffect(() => {
    const localDb = JSON.parse(localStorage.getItem(id));
    if (favChannel && localDb && localDb.length > 0) {
      db.collection("channels")
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

      // notification block v0.2
      // db.collection("favouriteChannels")
      //   .doc(cookies.user.id)
      //   .get()
      //   .then((channels) =>
      //     setFavChannel(
      //       channels.data().channels.some((channel) => channel === id)
      //     )
      //   )
      //   .then(() => {
      //     db.collection("channels")
      //       .doc(id)
      //       .collection("messages")
      //       .onSnapshot((snapshot) => {
      //         // console.log(snapshot.docs.length, localDb.length, favChannel);
      //         if (snapshot.docs.length > localDb.length && favChannel) {
      //           // console.log("Increased, snaps = ", id);
      //           // console.log(snapshot.docChanges());
      //           snapshot.docChanges().forEach((change) => {
      //             // console.log("Playsound");
      //             if (change.type === "added") playSound(clickAudio);
      //           });
      //         } // else console.log("The Same");

      //         // if (snapshot.metadata.fromCache) playSound(clickAudio);
      //         // let cache = snapshot.metadata.fromCache
      //         // console.log("Data came from ", cache)
      //       });
      //   });
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
  }, [id]);

  const playSound = (audioFile) => {
    audioFile.play();
  };
  // onClick={() => playSound(clickAudio)}
  return (
    <>
      <div
        className={
          currChannel === id ? "sidebarOption__selected" : "sidebarOption"
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
    </>
  );
}

export default SidebarOption;
