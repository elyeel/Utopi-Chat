import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import db from "../../firebase";
import Message from "../Message/Message";

function Chat() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);

  // fetch all details from current channel
  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()))
    }
  // fetch all messages from current channel
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

      <div className="chat__messages">
        {channelMessages.map(({ message, timestamp, user, userimage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userimage}
          />
        ))}
      </div>
    </div>
  )
}

export default Chat;
