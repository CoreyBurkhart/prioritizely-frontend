import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered');
    }).catch(registrationError => {
      console.log('SW registration failed');
    });
  });
}

ReactDOM.render(React.createElement(App), window.document.getElementById('app'));