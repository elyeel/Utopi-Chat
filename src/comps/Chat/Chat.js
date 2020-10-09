import React, { useEffect, useState } from "react";
import "./Chat.scss";
import db from "../../firebase";
import { useParams } from "react-router-dom";
import useChatHooks from "../hooks/useChatHooks";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Alert from '@material-ui/lab/Alert';
import Message from "../Message/Message";
import ChatForm from "../ChatForm/ChatForm";

function Chat({ cookies, currChannel }) {
  const { channelId } = useParams();
  const [alert, setAlert] = useState(false);
  const {
    setFavourite,
    channelMessages,
    channelDetails,
    favouriteChannel,
  } = useChatHooks(channelId, cookies, currChannel);

  useEffect(() => {
    updateScroll();
  }, [channelMessages]);

  const updateScroll = () => {
    const chatBox = document.getElementById("chat__messages");
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const showAlert = () => {
    setAlert(true);
    setTimeout(()=> {
      setAlert(false);
    }, 3000)
  };

  return (
    <div className="chat">
      {alert && <Alert severity="error" className='error'>Your message is blank!</Alert>}
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{channelDetails?.name}</strong>
            <span className={favouriteChannel ? "favs" : ""}>
              {favouriteChannel ? (
                <StarOutlinedIcon onClick={setFavourite} />
              ) : (
                <StarBorderOutlinedIcon onClick={setFavourite} />
              )}
            </span>
          </h4>
        </div>

        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div id="chat__messages" className="chat__messages">
        {channelMessages.map(({ id, message, timestamp, user, userimage }) => (
          <Message
            key={id}
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userimage}
          />
        ))}
      </div>

      <div className="chat__form">
        <ChatForm
          showAlert={showAlert}
          key={channelId}
          db={db}
          channelId={channelId}
          channelName={channelDetails?.name}
          cookies={cookies}
        />
      </div>
    </div>
  );
}

export default Chat;
