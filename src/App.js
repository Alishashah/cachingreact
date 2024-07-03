// src/App.js

import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const checkForUpdates = async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        registration.waiting.addEventListener('statechange', (event) => {
          if (event.target.state === 'activated') {
            window.location.reload();
          }
        });
      }
    };

    window.addEventListener('load', checkForUpdates);

    return () => window.removeEventListener('load', checkForUpdates);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        dataimage2
        dataimage3
      </header>
    </div>
  );
}

export default App;
