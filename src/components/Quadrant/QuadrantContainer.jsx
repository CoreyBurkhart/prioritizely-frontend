import { connect } from 'react-redux';
import Quadrant from './Quadrant';
import { deleteQuadrant, editById } from '../../store/actions/lists/creators';

const mapStateToProps = (state, ownProps) => ({
  name: state.lists.quadrants[ownProps.quadrantId].name,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteQuadrant: () => dispatch(deleteQuadrant(ownProps.chartId, ownProps.quadrantId)),
  editQuadrantName: event => dispatch(
    editById('quadrants', ownProps.quadrantId, 'name', event.target.value),
  ),
});

const QuadrantContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quadrant);

export default QuadrantContainer;
