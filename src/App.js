import React from 'react';
import translate from './helpers/translate';

function App() {
  ['blue grapes', '如何如何好', 'blaue Trauben'].forEach(message=>translate(message, 'en'));
  
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
