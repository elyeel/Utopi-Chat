import React from "react";
import "./Login.scss";
import { Button, responsiveFontSizes } from "@material-ui/core";
import { auth, provider } from "../../firebase";

function Login({ setCookie, db }) {
  const signIn = (e) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // const res = { ...result };
        // console.log(res);
        // const token = result.credential.accessToken;
        // const user = result.user;
        // console.log(user,token);
        setCookie("user", result.additionalUserInfo.profile);
        db.collection("favouriteChannels")
          .doc("result.additionalUserInfo.profile.id")
          .get()
          .then((doc) => {
            if (doc.data()) {
              db.collection("favouriteChannels")
                .doc(result.additionalUserInfo.profile.id)
                .set({ channels: [] })
                .then((docRef) =>
                  console.log(
                    docRef,
                    ", ",
                    result.additionalUserInfo.profile.id
                  )
                )
                .catch((error) =>
                  console.error("Error adding user to Favourite Channels List")
                );
            }
          });

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
      })
      .catch((error) => {
        alert(error.message);
      });
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
