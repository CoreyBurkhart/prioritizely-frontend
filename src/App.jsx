import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeView from './views/HomeView';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';

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
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/signup" component={SignupView} />
            <Route path="/login" component={LoginView} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
