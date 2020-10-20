import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Firebase Database
import db from "./firebase";

import { useCookies } from "react-cookie";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

// Components
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";
import Chat from "./comps/Chat/Chat";
import Login from "./comps/Login/Login";

// Styling
import "./App.css";

import {
  logout,
  login,
  register,
  loginWithGoogle,
} from "./helpers/firebaseAuth";
import Register from "./comps/Register/Register";

// db.enablePersistence()
//   .then((doc) => console.log("Local storage enabled", doc))
//   .catch((error) => console.error("Failed to enable local storage", error));

function App() {
  const [{ user }, dispatch] = useStateValue();

  // const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [currChannel, setCurrChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  // listen to acition events from auth comps
  const requestLogin = useCallback((event, email, password, name) => {
    login(event, email, password, setCookie, name);
  });

  const requestLogout = useCallback(() => {
    if (currChannel || cookies.channel) {
      db.collection("channelUsers")
        .doc(currChannel ? currChannel : cookies.channel)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          db.collection("channelUsers")
            .doc(currChannel ? currChannel : cookies.channel)
            .update({ users: arrUsers.filter((e) => e !== cookies.user.id) });
        })
        .then(() => {
          logout();
          removeCookie("user");
          removeCookie("channel");
        });
    }
    // logout();

    dispatch({
      type: actionTypes.LOG_OUT,
      user: "",
    });
    console.log("User logged out!");
  }, []);

  const requestRegister = useCallback((event, email, password, name) => {
    register(event, email, password, name, setCookie);
  });

  useEffect(() => {
    if (cookies && cookies.user && cookies.user.id) {
      db.collection("onlineUsers")
        .doc(cookies.user.id)
        .set({ id: cookies.user.id });
    }
  }, [cookies]);

  //removes user from database after they disconnect
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      db.collection("onlineUsers").doc(cookies.user.id).delete();
    });
    return () =>
      window.removeEventListener("beforeunload", () => {
        db.collection("onlineUsers").doc(cookies.user.id).delete();
      });
  }, []);

  if (cookies.user) {
    console.log("cookie", cookies.user);
  }
  if (user) {
    console.log("user", user);
  }
  return (
    <div className="App">
      <Router>
        {!cookies.user ? (
          <Switch>
            <Route path="/login">
              <Login
                setCookie={setCookie}
                db={db}
                setMessages={setMessages}
                messages={messages}
                onClick={requestLogin}
                loginWithGoogle={(e) => loginWithGoogle(setCookie)}
              />
              )
            </Route>
            <Route path="/register">
              {<Register onClick={requestRegister} />}
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        ) : (
          <>
            <Header
              // cookies={cookies}
              // setCookie={setCookie}
              removeCookie={removeCookie}
              // user={user}
              // setUser={setUser}
              onClick={requestLogout}
              currChannel={currChannel}
              db={db}
            />
            <div className="app__body">
              <Sidebar
                cookies={cookies}
                setCookie={setCookie}
                setCurrChannel={setCurrChannel}
                currChannel={currChannel}
                db={db}
              />
              <Switch>
                <Route path="/channel/:channelId">
                  <Chat currChannel={currChannel} db={db} cookies={cookies} />
                  {/* <Chat currChannel={currChannel} db={db} /> */}
                </Route>
                <Route path="/">
                  <div className="welcome-page">
                    <div>
                      <h2>Welcome</h2>
                    </div>
                    <div>
                      {/* <h3>About:</h3>
                        Utopi-Chat is a chat page for general topics. You can translate the messages on each  */}
                      <div>
                        <h4>Developed By:</h4>
                        <p>
                          <a
                            target="_blank"
                            href="https://github.com/eileenlimur"
                          >
                            Eileen
                          </a>
                        </p>
                        <p>
                          <a
                            target="_blank"
                            href="https://github.com/endonoh0/"
                          >
                            Eric
                          </a>
                        </p>
                        <p>
                          <a target="_blank" href="https://github.com/elyeel">
                            James
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
