import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from '@/store';
import AccountView from './views/AccountView';
import SignupView from './views/SignupView';
import SigninView from './views/SigninView';
import TodoChartView from './views/TodoChartView';
import ChartsListView from './views/ChartsListView';
import Navigation from './components/Navigation/Navigation';

function registerServiceWorker(path = '/service-worker.js') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path).catch((registrationError) => {
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
            <Route
              render={({ location }) => (
                <Fragment>
                  <Route render={props => (<Navigation {...props} />)} />
                  <TransitionGroup>
                    <CSSTransition
                      classNames="example"
                      timeout={300}
                      key={location.key}
                      exit={false}
                    >
                      <Switch location={location}>
                        <Route path="/" exact component={ChartsListView} />
                        <Route path="/list/:listId" component={TodoChartView} />
                        <Route path="/account" exact component={AccountView} />
                        <Route path="/signup" exact component={SignupView} />
                        <Route path="/signin" exact component={SigninView} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </Fragment>
              )}
            />
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
}
