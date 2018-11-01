import { connect } from 'react-redux';
import {
  setLastChart,
  deleteChart as deleteChartAction,
} from '../../store/actions/lists/creators';
import ChartCardLink from './ChartCardLink';

const mapStateToProps = (state, { chart: { id } }) => ({
  quadrants: state.lists.charts[id].quadrants.map(
    qid => state.lists.quadrants[qid],
  ),
  todos: state.lists.todos,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setLastChart: () => dispatch(setLastChart(ownProps.chart.id)),
  deleteChart: () => dispatch(deleteChartAction(ownProps.chart.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChartCardLink);
