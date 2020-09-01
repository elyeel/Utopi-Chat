import React from 'react';
import "./App.css";
import Header from "./comps/Header/Header";
import Sidebar from "./comps/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <h1>UtopiChat</h1>

      <Header />
      <div className="app__body">
        <Sidebar />

        {/* React-Router -> Chat screen */}
      </div>
    </div>
  );
}

export default App;
