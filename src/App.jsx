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

    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'thisisatestpassword!',
      }),
    }).then(res => res.json())
      .catch((error) => {
        throw error;
      });
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
