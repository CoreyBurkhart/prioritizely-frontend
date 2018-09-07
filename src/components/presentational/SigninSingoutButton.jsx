import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function SigninSignoutButton({
  isSignedIn, onSignout, signinPath,
}) {
  if (isSignedIn) {
    return (
      <Button
        type="button"
        variant="text"
        color="primary"
        onClick={onSignout}
      >
        signout
      </Button>
    );
  }

  return (
    <Link to={signinPath}>
      <Button
        type="button"
        variant="text"
        color="primary"
      >
        signin
      </Button>
    </Link>
  );
}

SigninSignoutButton.defaultProps = {
  signinPath: '/signin',
};

SigninSignoutButton.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  onSignout: PropTypes.func.isRequired,
  signinPath: PropTypes.string,
};

export default SigninSignoutButton;
