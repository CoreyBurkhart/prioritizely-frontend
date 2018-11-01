import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Delete,
  CheckBoxOutlineBlank,
  CheckBox,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';

// {/* <Link to={`/list/${id}`} onClick={setLastChart}>{name}</Link> */}
class ChartCardLink extends Component {
  constructor() {
    super();
    this.state = {
      menuAnchor: null,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu(event) {
    this.setState({
      menuAnchor: event.currentTarget,
    });
  }

  closeMenu() {
    this.setState({
      menuAnchor: null,
    });
  }

  render() {
    const {
      chart: { name, id },
      deleteChart,
      setLastChart,
      quadrants,
      todos,
    } = this.props;
    const { menuAnchor } = this.state;
    /*
     * - Chart Name
     * - Quadrant Names
     *   - Number of Todos
     */
    const quadrantDisplay = quadrants.map((q) => {
      const completedTodos = q.todos.filter(tid => todos[tid].checked);
      return (
        // <Card className="sub-card" raised>
        <Button
          component={Link}
          key={q.id}
          color="primary"
          variant="outlined"
          onClick={setLastChart}
          to={`/list/${id}#${q.id}`}
        >
          <CheckBoxOutlineBlank className="quad-stat-icon" />
          <span className="quad-stat-num">{q.todos.length - completedTodos.length}</span>
          <CheckBox className="quad-stat-icon" />
          <span className="quad-stat-num">{completedTodos.length}</span>
          &nbsp; &nbsp;
          {q.name}
        </Button>
        // </Card>
      );
    });
    const optionsButton = (
      <IconButton
        onClick={this.openMenu}
        aria-owns={menuAnchor ? `${id}-menu` : null}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
    );
    const menu = (
      <Menu
        id={`${id}-menu`}
        open={Boolean(menuAnchor)}
        onClose={this.closeMenu}
        anchorEl={menuAnchor}
      >
        <MenuItem onClick={deleteChart} button>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    );

    return (
      <Card className="chart-card" raised>
        <CardHeader
          action={optionsButton}
          title={(
            <Typography className="chart-card-title" color="primary" variant="headline" onClick={setLastChart} component={Link} to={`/list/${id}`}>
              {name}
            </Typography>
          )}
        />
        {menu}
      </Card>
    );
  }
}

ChartCardLink.defaultProps = {
  setLastChart: () => {},
};

ChartCardLink.propTypes = {
  chart: PropTypes.shape({
    name: PropTypes.string,
    quadrants: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  }).isRequired,
  setLastChart: PropTypes.func,
  deleteChart: PropTypes.func.isRequired,
};

export default ChartCardLink;
