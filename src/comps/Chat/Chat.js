import React, { useEffect, useState } from "react";
import "./Chat.scss";
import db from '../../firebase'
import { useParams } from "react-router-dom";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Message from "../Message/Message";
import ChatForm from "../ChatForm/ChatForm";

function Chat({ cookies }) {
  const { channelId } = useParams();

  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [favouriteChannel, setFavouriteChannel] = useState(false);

  // fetch all details from current channel
  useEffect(() => {
    console.log(channelId);
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));
    }
    // fetch all messages from current channel
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChannelMessages(
          snapshot.docs.map((doc) => {
            // console.log("docs",doc.id);
            return {
              id: doc.id,
              message: doc.data().message,
              user: doc.data().user,
              userimage: doc.data().userimage,
              timestamp: doc.data().timestamp
            };
          })
        )
      );
    db.collection("favouriteChannels")
      .doc(cookies.user.id)
      .onSnapshot((snaps) => {
        if (snaps)
          setFavouriteChannel(
            snaps.data().channels.some((elem) => elem === channelId)
          );
      });
  }, [channelId, db, cookies.user.id]);

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

  

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{channelDetails?.name}</strong>
            <span>
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
            <InfoOutlinedIcon  /> Details
          </p>
        </div>
      </div>

      <div className="chat__messages">
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
        <ChatForm db={db} channelId={channelId} />
      </div>
    </div>
  );
}

export default Chat;
