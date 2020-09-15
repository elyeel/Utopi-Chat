import React, { useState } from "react";
import "./App.css";
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./comps/Chat/Chat";
import Login from "./comps/Login/Login";
import { useCookies } from "react-cookie";

function App() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <div className="App">
      <Router>
        {!cookies.user ? (
          <Login setCookie={setCookie} />
        ) : (
          <>
            <Header
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
              user={user}
              setUser={setUser}
            />
            <div className="app__body">
              <Sidebar
                cookies={cookies}
                setOnlineUsers={setOnlineUsers}
                onlineUsers={onlineUsers}
              />
              <Switch>
                <Route path="/channel/:channelId">
                  <Chat onlineUsers={onlineUsers} />
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
