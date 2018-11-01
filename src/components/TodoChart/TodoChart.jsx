import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button, Grid, Input, AppBar, Toolbar, CircularProgress,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Quadrant from '../Quadrant/QuadrantContainer';
import ChartNotFound from '../ChartNotFound';

function TodoChart({
  addQuadrant, editChartName, onDragEnd, chart, chartId, saving,
}) {
  if (chart === undefined) {
    return <ChartNotFound />;
  }

  const { name, quadrants: quadrantIds } = chart;

  return (
    <div className="todo-chart">
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Grid container>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={chartId} type="QUADRANT">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className="full-width">
                {quadrantIds.map((id, i) => (
                  <Draggable draggableId={id} index={i} key={id}>
                    {(dragProvided, dragSnapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        className="full-width"
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                      >
                        <Quadrant chartId={chartId} quadrantId={id} key={id} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Button
        className="add-chart-button"
        color="primary"
        variant="fab"
        position="fixed"
        onClick={addQuadrant}
        title="Add a new section"
      >
        <AddIcon />
      </Button>
    </div>
  );
}

TodoChart.defaultProps = {
  chart: undefined,
};

TodoChart.propTypes = {
  addQuadrant: PropTypes.func.isRequired,
  editChartName: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  chart: PropTypes.shape({
    name: PropTypes.string,
    quadrants: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  }),
  chartId: PropTypes.string.isRequired,
};

export default TodoChart;
