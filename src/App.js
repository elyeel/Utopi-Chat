
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";
import Chat from "./comps/Chat/Chat";
import Login from "./comps/Login/Login";
import db from "./firebase";

import "./App.css";
  
function App() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [currChannel, setCurrChannel] = useState(null);

  return (
    <div className="App">
      <Router>
        {!cookies.user ? (
          <Login setCookie={setCookie} db={db} />
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
                setCurrChannel={setCurrChannel}
                currChannel={currChannel}
                db={db}
              />
              <Switch>
                <Route path="/channel/:channelId">
                  <Chat currChannel={currChannel} db={db} />
                </Route>
                <Route path="/">
                  <div className='welcome-page'>
                    <div><h2>Welcome</h2></div>
                    <div>
                      {/* <h3>About:</h3>
                        Utopi-Chat is a chat page for general topics. You can translate the messages on each  */}
                      <div>
                        <h4>
                          Developed By:
                        </h4>
                        <p><a target='_blank' href='https://github.com/eileenlimur'>Eileen</a></p>
                        <p><a target='_blank' href='https://github.com/endonoh0/'>Eric</a></p>
                        <p><a target='_blank' href='https://github.com/elyeel'>James</a></p>
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
