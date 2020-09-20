import React, { useState } from "react";
import "./Message.scss";
import TranslatedMessageModal from "../TranslatedMessageModal/TranslatedMessageModal";
import Button from '@material-ui/core/Button';


function Message({ message, timestamp, user, userImage }) {
  const [ShowTranslateButton, setShowTranslateButton] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  return (
    <div className="message" onMouseEnter={()=>setShowTranslateButton(true)} onMouseLeave={()=>setShowTranslateButton(false)}>
      <img src={userImage} alt="" />
      <div className="message__info">
        <h4>
          {user}{" "}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
          <p>{message}</p>
          {ShowTranslateButton && <Button onClick={()=>setShowTranslation(true)}>Translate</Button>}
          <TranslatedMessageModal
            isOpen={showTranslation}
            closeModal={()=>setShowTranslation(false)}
            message={message}
          />
        </h4>
      </div>
    </div>
  )
}

export default Message;
