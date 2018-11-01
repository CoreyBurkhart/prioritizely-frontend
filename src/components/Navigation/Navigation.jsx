import React, { Fragment } from 'react';
import BottomNav from '../BottomNav/BottomNavContainer';
import TopNav from '../TopNav/TopNav';

function Naviation(props) {
  return (
    <Fragment>
      <TopNav />
      <BottomNav {...props} />
    </Fragment>
  );
}

export default Naviation;
