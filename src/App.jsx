import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from '@/store';
import HomeView from './views/HomeView';
import SignupView from './views/SignupView';
import SigninView from './views/SigninView';

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
    // registerServiceWorker();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
          <BrowserRouter>
            <Route render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  classNames="example"
                  timeout={300}
                  key={location.key}
                  unmountOnExit
                  exit={false}
                >
                  <Switch location={location}>
                    <Route path="/" exact component={HomeView} />
                    <Route path="/signup" exact component={SignupView} />
                    <Route path="/signin" exact component={SigninView} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
            />
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
}
