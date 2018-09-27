import React from 'react';
import SigninSignoutContainer from '@/components/containers/SigninSignoutContainer';
import TodoChart from '../components/containers/TodoChartContainer';


const HomeView = () => (
  <div id="test">
    <TodoChart chartId="chart1" />
    <SigninSignoutContainer />
  </div>
);

export default HomeView;
