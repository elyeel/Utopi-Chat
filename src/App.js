import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";
import Chat from "./comps/Chat/Chat";
import Login from "./comps/Login/Login";
import db from "./firebase";

import "./App.css";

// db.enablePersistence()
//   .then((doc) => console.log("Local storage enabled", doc))
//   .catch((error) => console.error("Failed to enable local storage", error));

function App() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "channel"]);
  const [currChannel, setCurrChannel] = useState(null);
  const [messages, setMessages] = useState([]);

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
      db.collection("onlineUsers")
        .doc(cookies.user.id)
        .delete();
    });
    return () => window.removeEventListener("beforeunload", () => {
      db.collection("onlineUsers")
        .doc(cookies.user.id)
        .delete();
    });
  }, []);

  return (
    <div className="App">
      <Router>
        {!cookies.user ? (
          <Login
            setCookie={setCookie}
            db={db}
            setMessages={setMessages}
            messages={messages}
          />
        ) : (
          <>
            <Header
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
              user={user}
              setUser={setUser}
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
