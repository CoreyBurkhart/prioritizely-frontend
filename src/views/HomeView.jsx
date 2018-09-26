import React from 'react';
import SigninSignoutContainer from '@/components/containers/SigninSignoutContainer';
import TodoChart from '../components/TodoChart';
import TodoChartClass from '@/utils/classes/TodoChart';

const state = new TodoChartClass();

const HomeView = () => (
  <div id="test">
    <TodoChart chart={state} />
    <SigninSignoutContainer />
  </div>
);

export default HomeView;
