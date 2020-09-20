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
  const [language, setLanguage] = useState('en');

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
                language={language}
                setLanguage={setLanguage}
              />
              <Switch>
                <Route path="/channel/:channelId">
                  <Chat currChannel={currChannel} db={db} language={language} />
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
