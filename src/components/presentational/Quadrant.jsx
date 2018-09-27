import React from 'react';
import PropTypes from 'prop-types';
import CheckList from '../containers/CheckListContainer';

function Quadrant({ name, quadrantId }) {
  return (
    <div className="quadrant">
      <h6 className="quadrant-title">{name}</h6>
      <CheckList quadrantId={quadrantId} />
    </div>
  );
}

Quadrant.propTypes = {
  name: PropTypes.string.isRequired,
  quadrantId: PropTypes.string.isRequired,
};

export default Quadrant;
