import { connect } from 'react-redux';
import TodoChart from '../presentational/TodoChart';
import { dndReorder } from '../../store/actions/lists/creators';

const mapStateToProps = (state, ownProps) => ({
  name: state.lists.charts[ownProps.chartId].name,
  quadrantIds: state.lists.charts[ownProps.chartId].quadrants,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDragEnd: (result) => {
    dispatch(dndReorder(result));
  },
});

const TodoChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoChart);

export default TodoChartContainer;
