import { useEffect, useState } from "react";
import db from "../../firebase";
let count = 0;

// fetch all details from current channel
export default function useChatHooks(channelId, cookies, currChannel) {
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [favouriteChannel, setFavouriteChannel] = useState(false);

  useEffect(() => {
    // fetch all messages from current channel
    if (channelId && cookies.channel) {
      db.collection("channels")
        .doc(cookies.channel)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          // console.log("From chat inside snapshot", channelId, cookies.channel);
          setChannelMessages(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                message: doc.data().message,
                user: doc.data().user,
                userimage: doc.data().userimage,
                timestamp: doc.data().timestamp,
              };
            })
          );
        });
    }
  }, [channelId, cookies.user.id, cookies.channel]);

  useEffect(() => {
    if (channelId) {
      db.collection("favouriteChannels")
        .doc(cookies.user.id)
        .onSnapshot((snaps) => {
          if (snaps)
            setFavouriteChannel(
              snaps.data().channels.some((elem) => elem === channelId)
            );
        });
    }
  }, [channelId, cookies]);

  useEffect(() => {
    if (channelId) {
      ++count;
      console.log(`Channel Id got changed ${count} with ${channelId} `);
    }
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));
      // console.log("From chat before", channelId);
    }
  }, [channelId]);

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
          // console.log(channels);
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
      .catch((error) => console.error("Document is not exist", error));
    // console.log("before ", channels);
  };

  return { setFavourite, channelDetails, channelMessages, favouriteChannel };
}
