import React, { useState } from "react";
import "./Login.scss";
import { responsiveFontSizes } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const localDb = async (db) => {
  // building array of objects from firestore, call this function to create local db on login, currently unused
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
        }
      })
      .catch((error) => console.error("Error in getting messages", error));
  } catch (error) {
    console.error(error);
  }
};

// building array of objects from firestore
// localDb(db);
function Login({
  setCookie,
  db,
  messages,
  setMessages,
  onClick,
  loginWithGoogle,
}) {
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const signIn = (email) => {
    // auth
    //   .signInWithPopup(provider)
    //   .then((result) => {
    // console.log('result', result);
    console.log("calling dispatch");
    dispatch({
      type: actionTypes.SET_USER,
      user: email,
    });
  };

  // login -> using google credential
  const login = (e) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("result", result);
        setCookie("user", result.additionalUserInfo.profile);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.additionalUserInfo.profile,
        });
        db.collection("favouriteChannels")
          .doc(result.additionalUserInfo.profile.id)
          .get()
          .then((fav) => {
            if (!fav.data()) {
              db.collection("favouriteChannels")
                .doc(result.additionalUserInfo.profile.id)
                .set({
                  id: result.additionalUserInfo.profile.id,
                  channels: [],
                });
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      <Form className="login">
        <div className="login__container">
          <h1>Sign in</h1>

          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={(event) => onChangeHandler(event)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              id="inputPassword6"
              aria-describedby="passwordHelpInline"
              name="password"
              value={password}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                {" "}
                Remember me
              </label>
            </div>
          </div>

          <Button
            type="submit"
            onClick={(event) => {
              signIn(email);
              onClick(event, email, password);
              setEmail("");
              setPassword("");
            }}
          >
            Sign in
          </Button>

          <div className="auth-group">
            <p>
              Sign in with{" "}
              <a href="#" onClick={login}>
                Google?
              </a>
            </p>
            <p>
              <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
