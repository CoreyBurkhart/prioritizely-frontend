import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import { AccountCircle, List as ListIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function AppDrawer(props) {
  const drawerContent = (
    <nav>
      <List>
        <Link to="/account">
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Lists" />
          </ListItem>
        </Link>
      </List>
    </nav>
  );

  return (
    <Drawer anchor="left" {...props}>
      {drawerContent}
    </Drawer>
  );
}

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AppDrawer;
