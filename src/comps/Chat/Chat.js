import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import db from "../../firebase";

function Chat() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState(null);

  // returns all details from current channel
  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()))
    }
  // returns all messages from current channel
    db.collection('channels').doc(channelId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setChannelMessages(snapshot.docs.map((doc) => doc.data()))
    );
  }, [channelId])

  console.log('messages: ', channelMessages);
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{channelDetails?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>

        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
    </div>
  )
}

export default Chat;
