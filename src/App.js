import React from 'react';
import "./App.css";
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from './comps/Chat/Chat';


function App() {
  return (
    <div className="App">
      <h1>UtopiChat</h1>

      <Header />
      <div className="app__body">
        <Sidebar />

        {/* React-Router -> Chat screen */}
        <Switch>
          <Route path="/channel/:channelId">
            <h1>Chat Screen</h1>
            <Chat/>
          </Route>
          <Route path="/">
            <h1>Welcome</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
