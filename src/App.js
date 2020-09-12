import React from 'react';
import useTranslator from './hooks/useTranslator';

function App() {
  const { translate } = useTranslator();
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
