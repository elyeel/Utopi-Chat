import React, { useState } from "react";
import "./Message.scss";
import TranslatedMessageModal from "../TranslatedMessageModal/TranslatedMessageModal";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";
import IconButton from "@material-ui/core/IconButton";

function Message({ message, timestamp, user, userImage }) {
  const [ShowTranslateButton, setShowTranslateButton] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  return (
    <div
      className="message"
      onMouseEnter={() => setShowTranslateButton(true)}
      onMouseLeave={() => setShowTranslateButton(false)}
    >
      <div className="message__left">
        <img src={userImage} alt="" />
        <div className="message__info">
          <h4>
            {user}{" "}
            <span className="message__timestamp">
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
            <div className="message-box">
              <p>{message}</p>
            </div>
            <TranslatedMessageModal
              isOpen={showTranslation}
              closeModal={() => setShowTranslation(false)}
              message={message}
            />
          </h4>
        </div>
      </div>
      {ShowTranslateButton && (
        <div>
          <IconButton className="translate-button">
            <TranslateIcon onClick={() => setShowTranslation(true)} />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Message;
