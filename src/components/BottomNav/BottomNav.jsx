/* eslint-disable consistent-return */

import React from 'react';
import { BottomNavigation, BottomNavigationAction, Hidden } from '@material-ui/core';
import { AccountCircle, List, WatchLater } from '@material-ui/icons';
import PropTypes from 'prop-types';

function BottomNav({ lastChartId, history, location: { pathname } }) {
  const home = '/';
  const account = '/account';
  const lastChart = `/list/${lastChartId}`;
  const onNavigate = (event, value) => {
    switch (value) {
      case home:
        history.push(home);
        break;
      case account:
        history.push(account);
        break;
      case lastChart:
        if (lastChartId !== '') {
          history.push(lastChart);
          break;
        }
        break;
      default:
        break;
    }
  };

  return (
    <Hidden smUp>
      <BottomNavigation
        classes={{ root: 'bottom-nav' }}
        showLabels
        value={pathname}
        onChange={onNavigate}
      >
        <BottomNavigationAction
          color="primary"
          value={account}
          label="Account"
          icon={<AccountCircle />}
        />
        <BottomNavigationAction
          color="primary"
          value={home}
          label="All Lists"
          icon={<List />}
        />
        <BottomNavigationAction
          color="primary"
          value={lastChart}
          label="Recent List"
          icon={<WatchLater />}
        />
      </BottomNavigation>
    </Hidden>
  );
}

BottomNav.propTypes = {
  lastChartId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BottomNav;
