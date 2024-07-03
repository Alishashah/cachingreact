// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        registration.waiting.addEventListener('statechange', (event) => {
          if (event.target.state === 'activated') {
            window.location.reload();
          }
        });
      }
    });
  };

  return (
    <div className="App">
      {updateAvailable && (
        <div className="update-notification">
          <p>New update is available.</p>
          <button onClick={handleUpdate}>Update Now</button>
        </div>
      )}
      data
    </div>
  );
}

export default App;
