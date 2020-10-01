import React, {useState} from "react";
import "./Login.scss";
import { responsiveFontSizes } from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

function Login({ setCookie, db, messages, setMessages, onClick, loginWithGoogle }) {
  const [state, dispatch] = useStateValue();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
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
        console.log('calling dispatch');
        dispatch({
          type: actionTypes.SET_USER,
          user: email
        })

      // })
      // .catch(error => {
      //   alert(error.message)
      // })


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

  const login = (e) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('result', result);
        setCookie("user", result.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch(error => {
        alert(error.message)
      })
  }
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
            onChange={event => onChangeHandler(event)}
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
            onChange={e => onChangeHandler(e)}
          />
        </Form.Group>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1"> Remember me</label>
          </div>
        </div>

        <Button
          type="submit"
          onClick={event => {
            signIn(email);
            onClick(event, email, password);
            setEmail("");
            setPassword("");
          }
        }>
          Sign in
        </Button>

        <div className="auth-group">
          <p>Sign in with <a href="#" onClick={login}>Google?</a></p>
          <p><a href="/register">Register</a></p>
        </div>

      </div>
    </Form>
    </>
  );
}

export default Login;
