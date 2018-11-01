import React, { Component, Fragment } from 'react';
import {
  AppBar, Toolbar, IconButton, Hidden, CircularProgress, Grid, Input,
} from '@material-ui/core';
import { Menu as MenuIcon, CloudDone as CloudDoneIcon } from '@material-ui/icons';
import AppDrawer from '../AppDrawer/AppDrawer';

class TopBar extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  closeDrawer() {
    this.setState({
      open: false,
    });
  }

  openDrawer() {
    this.setState({
      open: true,
    });
  }

  render() {
    const { open } = this.state;
    const { saving } = this.props;

    let savedIcon = <CloudDoneIcon title="saved" />;

    if (saving) {
      savedIcon = <CircularProgress color="secondary" size={26} />;
    }

    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Hidden xsDown>
              <IconButton color="inherit" aria-label="Menu" onClick={this.openDrawer}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Input
              className="todo-chart-title"
              placeholder="Name"
              value="edit"
              disableUnderline
            />
            <Grid item xs={1}>
              {savedIcon}
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden xsDown>
          <AppDrawer open={open} onClose={this.closeDrawer} />
        </Hidden>
      </Fragment>
    );
  }
}

export default TopBar;
