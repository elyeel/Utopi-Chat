import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./ChatForm.scss";
import db from "../../firebase";
import Loading from "../Loading";
import Button from "@material-ui/core/Button";
import toxicityCheck from "../../helpers/toxicityCheck";
import ToxicityWarningModal from "../ToxicityWarningModal/ToxicityWarningModal";
import { useStateValue } from "../../StateProvider";

export default function ChatForm({ channelId, channelName, showAlert }) {
  const [cookies] = useCookies(["user"]);
  const [msg, setMsg] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [{ user }] = useStateValue();

  const submitMsg = (event) => {
    event.preventDefault();
    if (msg.trim() === "") {
      showAlert();
    } else {
      setLoading(true);
      toxicityCheck(msg).then((res) => {
        setLoading(false);
        if (res) {
          setModal(true);
          setMsg("");
        } else if (channelId) {
          db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .add({
              message: msg,
              timestamp: new Date(Date.now()),
              user: user?.displayName || cookies?.user.name || "Anonymous",
              userimage: user?.picture || cookies?.user.avatar || "https://via.placeholder.com/150",
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
                .then(() =>
                  localStorage.setItem(channelId, JSON.stringify(tempArr))
                );
            })
            .catch((error) => console.error("Error adding message: ", error));
        }
      });
    }
  };

  return (
    <form className="chat__text">
      {/* <form className="chat__text" onSubmit={submitMsg}> */}
      <ToxicityWarningModal isOpen={modal} closeModal={() => setModal(false)} />
      <input
        className="chat__input"
        value={msg}
        placeholder={`Enter a message to #${channelName}`}
        onChange={(event) => setMsg(event.target.value)}
      ></input>
      {!loading ? (
        <Button type="submit" onClick={submitMsg} className="chat__btn">
          Send
        </Button>
      ) : (
        <Loading type="spokes" color="#0021a3" />
      )}
    </form>
  );
}
