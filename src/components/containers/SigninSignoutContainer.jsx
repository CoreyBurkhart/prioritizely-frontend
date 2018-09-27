import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninSignoutButton from '../presentational/SigninSingoutButton';
import { setAuthFlag } from '@/store/actions/app/creators';

class SigninSignoutContainer extends React.Component {
  constructor() {
    super();
    this.signout = this.signout.bind(this);
  }

  signout() {
    const { history, dispatch } = this.props;

    if (gapi.auth2 && gapi.auth2.getAuthInstance) {
      gapi.auth2
        .getAuthInstance()
        .signOut()
        .catch(console.error);
    }

    const backendSignout = fetch('/api/auth/signout');

    backendSignout.catch(console.error).then((res) => {
      if (res.ok) {
        dispatch(setAuthFlag(false));
        history.replace('/signin');
      }
    });
  }

  render() {
    const { userAuthenticated } = this.props;

    return <SigninSignoutButton isSignedIn={userAuthenticated} onSignout={this.signout} />;
  }
}

SigninSignoutContainer.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAuthenticated: PropTypes.bool.isRequired,
};

const mapProps = store => ({ userAuthenticated: store.app.authenticated });

const connSigninSignoutContainer = connect(mapProps)(SigninSignoutContainer);

export default withRouter(connSigninSignoutContainer);
