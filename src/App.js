<<<<<<< HEAD
import React from 'react';
import translate from './helpers/translate';

function App() {
  translate({
    text: ['blue grapes', '如何如何好', 'blaue Trauben'],
    target_language: 'en'
  });
  
=======
import React, { useState } from "react";
import "./App.css";
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./comps/Chat/Chat";
import Login from "./comps/Login/Login";
import { useCookies } from "react-cookie";
import db from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [currChannel, setCurrChannel] = useState(null);

>>>>>>> origin/feature/online-users
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
                  <h1>Welcome</h1>
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
