import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import HomeView from './views/HomeView';

function registerServiceWorker(path = '/service-worker.js') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path)
      .catch((registrationError) => {
        console.log('SW registration failed', registrationError);
      });
  }
}

export default class App extends React.Component {
  componentDidMount() {
    registerServiceWorker();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomeView} />
        </Switch>
      </BrowserRouter>
    );
  }
}
