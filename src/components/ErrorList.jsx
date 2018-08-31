import React from 'react';
import PropTypes from 'prop-types';

function ErrorList(props) {
  const { messages } = props;
  const listElements = messages
    .map(m => <li className="error-message" key={m}>{m}</li>);

  if (messages.length > 0) {
    return (
      <ul className="error-message">
        {listElements}
      </ul>
    );
  }

  return null;
}

ErrorList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default ErrorList;
