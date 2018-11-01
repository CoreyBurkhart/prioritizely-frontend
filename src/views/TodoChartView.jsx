import React from 'react';
import PropTypes from 'prop-types';
import TodoChart from '@/components/TodoChart/TodoChartContainer';

function TodoChartView({ match }) {
  const { listId } = match.params;

  return (
    <div className="view">
      <TodoChart chartId={listId} />
    </div>
  );
}

TodoChartView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TodoChartView;
