import React from 'react';
import PropTypes from 'prop-types';
import fetchOptions from '../utils/fetch';

/**
 * Note this is called even when the user is already signed in.
 * @param {Object} googleUser
 */
function handleGoogleSignin(googleUser) {
  const { id_token: idToken } = googleUser.getAuthResponse();
  const payload = {
    idToken,
  };

  fetch('/api/auth/signin/google', new fetchOptions.Post(payload))
    .then(async (res) => {
      if (res.ok) {
        handleGoogleSignin.onSuccess(res);
      } else {
        const { messages } = await res.json();
        handleGoogleSignin.onError(messages);
      }
    });
}

function renderGoogleButton() {
  if (gapi) {
    gapi.signin2.render('goog-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: handleGoogleSignin,
    });
  }
}

class GoogleSigninButton extends React.Component {
  constructor({ onSuccess, onError }) {
    super();

    handleGoogleSignin.onSuccess = onSuccess;
    handleGoogleSignin.onError = onError;
  }

  componentDidMount() {
    renderGoogleButton();
  }

  render() {
    const { style } = this.props;

    return (
      <div
        id="goog-signin2"
        data-onsuccess="handleGoogleSignin"
        style={style}
      />
    );
  }
}

GoogleSigninButton.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
  style: {},
};

GoogleSigninButton.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object,
};

export default GoogleSigninButton;
