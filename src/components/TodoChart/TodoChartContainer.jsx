import { connect } from 'react-redux';
import TodoChart from './TodoChart';
import {
  dndReorder,
  addQuadrant,
  editById,
} from '../../store/actions/lists/creators';

const mapStateToProps = (state, ownProps) => ({
  chart: state.lists.charts[ownProps.chartId],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDragEnd: result => dispatch(dndReorder(result)),
  addQuadrant: () => dispatch(addQuadrant(ownProps.chartId)),
  editChartName: event => dispatch(editById('charts', ownProps.chartId, 'name', event.target.value)),
});

const TodoChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoChart);

export default TodoChartContainer;
