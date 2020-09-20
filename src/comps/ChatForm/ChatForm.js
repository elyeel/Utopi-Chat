import React, {useState} from "react";
import ToxicityWarningModal from '../ToxicityWarningModal/ToxicityWarningModal';
import { useCookies } from "react-cookie";
import './ChatForm.scss'
import toxicityCheck from '../../helpers/toxicityCheck';

export default function ChatForm({ db, channelId, channelName }) {
  const [cookies] = useCookies(["user"]);
  const [msg, setMsg] = useState("");
  const [modal, setModal] = useState(false);

  const submitMsg = (event) => {
    event.preventDefault();
    toxicityCheck(msg)
    .then(res => {
      if (res) {
        setModal(true);
        setMsg('');
      } else {
        db.collection("channels")
          .doc(channelId)
          .collection("messages")
          .add({
            message: msg,
            timestamp: new Date(Date.now()),
            user: cookies.user.name,
            userimage: cookies.user.picture
          })
          .then((docRef) => {
            console.log("Written with id :", docRef.id);
            setMsg('');
          })
          .catch((error) => console.error("Error adding message: ", error));
      }
    })
  };

  return (
    <form className="chat__text" onSubmit={submitMsg}>
      <ToxicityWarningModal isOpen={modal} closeModal={()=>setModal(false)}/>
      <input className='chat__input'
        value={msg}
        placeholder={`Enter a message to #${channelName}`}
        onChange={(event) => setMsg(event.target.value)}
      ></input>
      <button type="submit" onClick={submitMsg} className='chat__btn'>
        Send
      </button>
    </form>
  );
}
