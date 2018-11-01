import { connect } from 'react-redux';
import BottomNav from './BottomNav';

const mapStateToProps = state => ({
  lastChartId: state.lists.lastChartId,
});
const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomNav);
