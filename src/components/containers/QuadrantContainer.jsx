import { connect } from 'react-redux';
import Quadrant from '../presentational/Quadrant';

const mapStateToProps = (state, ownProps) => ({
  name: state.lists.quadrants[ownProps.quadrantId].name,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

const QuadrantContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quadrant);

export default QuadrantContainer;
