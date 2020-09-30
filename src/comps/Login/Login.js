import React from "react";
import "./Login.scss";
import { Button, responsiveFontSizes } from "@material-ui/core";

import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const localDb = async (db) => {
  // building array of objects from firestore
  try {
    await db
      .collection("channels")
      .get()
      .then((docs) => {
        if (docs) {
          let localVar = docs.docs.map((doc) => {
            const channel = {};
            channel.name = doc.data().name;
            channel.messages = [];
            channel.docId = doc.id;
            return channel;
          });
          // console.log(localVar);

          for (let channel of localVar) {
            db.collection("channels")
              .doc(channel.docId)
              .collection("messages")
              .get()
              .then((msgs) => {
                for (let msg of msgs.docs) {
                  // console.log(msg)
                  channel.messages.push({
                    messageId: msg.id,
                    message: msg.data().message,
                    timestamp: msg.data().timestamp.toDate(),
                    user: msg.data().user,
                    userimage: msg.data().userimage,
                  });
                }
              })
              .then(() => {
                for (let local of localVar) {
                  localStorage.setItem(
                    local.docId,
                    JSON.stringify(local.messages)
                  );
                }
                localStorage.setItem("parent", JSON.stringify(localVar));
              })
              .catch((error) =>
                console.error(
                  "Error in getting message from messages collection",
                  error
                )
              );
          }
          console.log(localVar);

          // setTimeout(() => {
          //   for (let local of localVar) {
          //     localStorage.setItem(local.docId, JSON.stringify(local.messages));
          //   }
          //   localStorage.setItem("parent", JSON.stringify(localVar));
          // }, 2000);
        }
      })
      .catch((error) => console.error("Error in getting messages", error));
  } catch (error) {
    console.error(error);
  }
};

function Login({ setCookie, db, messages, setMessages }) {
  const [state, dispatch] = useStateValue();


  const signIn = (e) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('result', result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch(error => {
        alert(error.message)
      })

        // setCookie("user", result.additionalUserInfo.profile);
        // db.collection("favouriteChannels")
        //   .doc(result.additionalUserInfo.profile.id)
        //   .get()
        //   .then((fav) => {
        //     if (!fav.data()) {
        //       db.collection("favouriteChannels")
        //         .doc(result.additionalUserInfo.profile.id)
        //         .set({
        //           id: result.additionalUserInfo.profile.id,
        //           channels: [],
        //         });
        //     }
            // else {
            //   if (fav.data().channels.length <= 0) {
            //     db.collection("favouriteChannels")
            //       .doc(result.additionalUserInfo.profile.id)
            //       .set({
            //         id: result.additionalUserInfo.profile.id,
            //         channels: [],
            //       })
            //       .then((docRef) =>
            //         console.log(
            //           docRef,
            //           ", ",
            //           result.additionalUserInfo.profile.id
            //         )
            //       )
            //       .catch((error) =>
            //         console.error(
            //           "Error adding user to Favourite Channels List"
            //         )
            //       );
            //   }
            // }
          // })
          // .catch((error) => console.error(error));
        // .then((fav) => {
        //   if (fav && fav.data().channels.length <= 0) {
        //     db.collection("favouriteChannels")
        //       .doc(result.additionalUserInfo.profile.id)
        //       .set({
        //         id: result.additionalUserInfo.profile.id,
        //         channels: [],
        //       })
        //       .then((docRef) =>
        //         console.log(
        //           docRef,
        //           ", ",
        //           result.additionalUserInfo.profile.id
        //         )
        //       )
        //       .catch((error) =>
        //         console.error("Error adding user to Favourite Channels List")
        //       );
        //   }
        // });

        // building array of objects from firestore
        // localDb(db);

        // db.collection("users")
        //   .doc(result.additionalUserInfo.profile.id)
        //   .set({
        //     name: result.additionalUserInfo.profile.name,
        //     locale: result.additionalUserInfo.profile.locale,
        //     id: result.additionalUserInfo.profile.id,
        //     picture: result.additionalUserInfo.profile.picture,
        //     channelId: "none",
        //   })
        //   .then((docRef) => console.log("User added with ID", docRef.id))
        //   .catch((error) => console.error("Error adding User", error));
      // })
      // .catch((error) => {
      //   alert(error.message);
      // });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src="" alt="" />
        <h1>Sign In to Utopi Chat</h1>
        <p>Check us out at ...</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
