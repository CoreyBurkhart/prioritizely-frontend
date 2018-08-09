import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import HomeView from './views/HomeView';
import './test.sass';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}
