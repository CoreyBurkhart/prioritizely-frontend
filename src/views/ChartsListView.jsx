import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChartCardLink from '../components/ChartCardLink/ChartCardLinkContainer';
import { addChart as addChartAction } from '../store/actions/lists/creators';
import { Button, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import TodoChartClass from '@/utils/classes/TodoChart';

const mapStateToProps = (state, ownProps) => ({
  charts: state.lists.charts,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addChart: chart => dispatch(addChartAction(chart)),
});

function ChartsListView({ charts, addChart, history }) {
  const chartIds = Object.keys(charts);
  /**
   * @desc add new chart to state and navigate to that view.
   */
  const onNewChart = () => {
    const chart = new TodoChartClass();
    addChart(chart);
    history.push(`/list/${chart.id}`);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Lists</title>
      </Helmet>
      <div className="view chart-cards">
        <Grid container direction="row" justify="center">
          {chartIds.map(id => (
            <Grid item xs={11} key={id}>
              <ChartCardLink chart={charts[id]} />
            </Grid>
          ))}
        </Grid>
        <Button
          className="add-chart-button"
          color="primary"
          variant="fab"
          position="static"
          onClick={onNewChart}
          title="Add new todo chart."
        >
          <AddIcon />
        </Button>
      </div>
    </Fragment>
  );
}

ChartsListView.propTypes = {
  charts: PropTypes.objectOf(PropTypes.object).isRequired,
  addChart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChartsListView);
