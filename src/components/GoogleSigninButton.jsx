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

  fetch('/api/auth/login/google', new fetchOptions.Post(payload))
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
  gapi.signin2.render('goog-signin2', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: handleGoogleSignin,
  });
}

function GoogleSigninButton(props) {
  const { onSuccess, onError, style } = props;

  /**
   * TODO: find a better way of dealing with these handlers
   */
  handleGoogleSignin.onSuccess = onSuccess;
  handleGoogleSignin.onError = onError;

  if (gapi !== undefined) {
    setTimeout(renderGoogleButton, 0); // pseudo "componentDidMount"
  } else {
    window.addEventListener('load', renderGoogleButton);
  }

  return (
    <div
      id="goog-signin2"
      data-onsuccess="handleGoogleSignin"
      style={style}
    />
  );
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
