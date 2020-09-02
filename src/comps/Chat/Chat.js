import React from "react";
import "./Chat.scss";
import { useParams } from "react-router-dom";

function Chat() {
  // access current params from URL
  const { channelId } = useParams();

  return (
    <div className="chat">
      <h2>You are in the {channelId} channel</h2>
    </div>
  )
}

export default Chat;
