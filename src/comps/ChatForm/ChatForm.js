import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./ChatForm.scss";

export default function ChatForm({ db, channelId }) {
  const [cookies] = useCookies(["user"]);
  const [msg, setMsg] = useState("");

  const submitMsg = (event) => {
    event.preventDefault();
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        message: msg,
        timestamp: new Date(Date.now()),
        user: cookies.user.name,
        userimage: cookies.user.picture,
      })
      .then((docRef) => {
        const tempArr = [];
        console.log("Written with id :", docRef.id);
        setMsg("");
          db.collection("channels")
            .doc(channelId)
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
            .then(() => localStorage.setItem(channelId, JSON.stringify(tempArr)));
      })
      .catch((error) => console.error("Error adding message: ", error));
  };

  return (
    <form className="chat__text" onSubmit={submitMsg}>
      <input
        className="chat__input"
        value={msg}
        placeholder="What's your buzzing?"
        onChange={(event) => setMsg(event.target.value)}
      ></input>
      <button type="submit" className="chat__btn">
        Send
      </button>
    </form>
  );
}
