import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Quadrant from '../containers/QuadrantContainer';

function TodoChart({
  onDragEnd, name, quadrantIds, chartId,
}) {
  return (
    <div className="todo-chart">
      <h2>{name}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={chartId} type="QUADRANT">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {quadrantIds.map((id, i) => (
                <Draggable draggableId={id} index={i} key={id}>
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <Quadrant quadrantId={id} key={id} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

TodoChart.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  quadrantIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartId: PropTypes.string.isRequired,
};

export default TodoChart;
