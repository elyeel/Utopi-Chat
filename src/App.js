import React from 'react';
import toxicityCheck from './helpers/toxicity';

function App() {
  toxicityCheck('just wanted to say, have a nice day ok?', result => console.log(result));
  return (
    <div className="App">
      <h1>UtopiChat</h1>

      {/* Header */}
      {/* Sidebar */}
      {/* React-Router -> Chat screen */}
    </div>
  );
}

export default App;
