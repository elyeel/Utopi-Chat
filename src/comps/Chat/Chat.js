import React, { useEffect, useState } from "react";
import "./Chat.scss";
import db from "../../firebase";
import { useParams } from "react-router-dom";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Alert from '@material-ui/lab/Alert';
import Message from "../Message/Message";
import ChatForm from "../ChatForm/ChatForm";

function Chat({ cookies }) {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [favouriteChannel, setFavouriteChannel] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    updateScroll();
  }, [channelMessages]);

  // fetch all details from current channel

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));
    }
    // fetch all messages from current channel
    console.log("From chat before", channelId);
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setChannelMessages(
          snapshot.docs.map((doc) => {
            console.log("From chat inside snapshot", channelId);
            return {
              id: doc.id,
              message: doc.data().message,
              user: doc.data().user,
              userimage: doc.data().userimage,
              timestamp: doc.data().timestamp,
            };
          })
          // setChannelMessages([...newMessages]);
          // console.log("docs",doc.id);
          // console.log("From chat inside snapshot", channelId);
          // return {
          //   id: doc.id,
          //   message: doc.data().message,
          //   user: doc.data().user,
          //   userimage: doc.data().userimage,
          //   timestamp: doc.data().timestamp,
          // }
        );
      });
    db.collection("favouriteChannels")
      .doc(cookies.user.id)
      .onSnapshot((snaps) => {
        if (snaps)
          setFavouriteChannel(
            snaps.data().channels.some((elem) => elem === channelId)
          );
      });
  }, [channelId, cookies.user.id]);

  const setFavourite = () => {
    // get favourite channels list and save it into channels
    let channels = [];
    db.collection("favouriteChannels")
      .doc(cookies.user.id)
      .get()
      .then((doc) => {
        // console.log("from db ", doc.data().channels);
        channels = doc.data().channels;
        // if favourite channel => change it to not and delist channel from favouriteChannel list
        if (favouriteChannel) {
          channels = channels.filter((elem) => elem !== channelId);
          // else => change it to favourite channel and list channel on favouriteChannel list
        } else {
          channels.push(channelId);
          console.log(channels);
        }
        // update channels to db
        db.collection("favouriteChannels")
          .doc(cookies.user.id)
          .update({ channels: channels })
          .then(() => console.log("Favourite Channels is updated"))
          .catch((error) =>
            console.error("Error updating Favourite Channels!", error)
          );
        // setFavouriteChannel(!favouriteChannel);
      })
      .catch((error) => console.log("Document is not exist", error));
    // console.log("before ", channels);
  };

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
          db={db}
          channelId={channelId}
          channelName={channelDetails?.name}
        />
      </div>
    </div>
  );
}

export default Chat;
