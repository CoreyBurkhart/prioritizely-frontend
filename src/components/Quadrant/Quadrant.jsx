import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Grid, Paper, IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import CheckList from '../CheckList/CheckListContainer';

function Quadrant({
  name, quadrantId, deleteQuadrant, editQuadrantName,
}) {
  return (
    <Paper className="quadrant">
      <Grid justify="center" alignItems="center" container>
        <Grid
          container
          item
          alignItems="center"
          xs={12}
          className="quadrant-title"
        >
          <Grid item xs={11}>
            <TextField
              id={quadrantId}
              placeholder="Quadrant Name"
              value={name}
              onChange={editQuadrantName}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={deleteQuadrant}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <CheckList quadrantId={quadrantId} />
        </Grid>
      </Grid>
    </Paper>
  );
}

Quadrant.propTypes = {
  name: PropTypes.string.isRequired,
  quadrantId: PropTypes.string.isRequired,
  deleteQuadrant: PropTypes.func.isRequired,
  editQuadrantName: PropTypes.func.isRequired,
};

export default Quadrant;
