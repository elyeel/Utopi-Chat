import React from "react";
import "./Login.scss";
import { Button } from "@material-ui/core";
import { auth, provider } from "firebase";

function Login() {

  const signIn = (e) => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        alert(error.message)
      })
  }
  return (
    <div className="login">
      <div className="login__container">
        <img src="" alt="" />
        <h1>Sign In to Utopi Chat</h1>
        <p>Check us out at ...</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  )
}

export default Login;
