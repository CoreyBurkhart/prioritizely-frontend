import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GoogleSigninButton from '../components/GoogleSigninButton';
import ErrorList from '../components/presentational/ErrorList';
import HomeLinkImg from '../components/presentational/HomeLinkImg';
import fetchOptions from '../utils/fetch';
import { setAuthFlag } from '../store/actions/app/creators';

class SigninView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessages: [],
    };

    this.signin = this.signin.bind(this);
    this.googleSigninSuccess = this.googleSigninSuccess.bind(this);
    this.googleSigninError = this.googleSigninError.bind(this);
  }

  updateFormTextFieldState(stateKey, event) {
    event.preventDefault();
    this.setState({
      [stateKey]: event.target.value,
    });
  }

  signin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const payload = {
      email,
      password,
    };

    fetch('/api/auth/signin', new fetchOptions.Post(payload))
      .then(async (res) => {
        if (res.ok) {
          const { history } = this.props;
          history.replace('/');
        } else if (res.status === 400) {
          const body = await res.json();
          this.setState({
            errorMessages: body.messages,
            password: '',
          });
        }
      }).catch(console.error);
  }

  googleSigninSuccess() {
    const { history, dispatch } = this.props;
    dispatch(setAuthFlag(true));
    history.replace('/');
  }

  googleSigninError(messages) {
    this.setState({
      errorMessages: messages,
    });
  }

  render() {
    const {
      email,
      password,
      errorMessages,
    } = this.state;

    return (
      <Grid container direction="column" justify="center" style={{ height: '100%' }}>
        <Grid item container id="signin-view" justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper className="base-paper">
              <Grid
                container
                justify="center"
              >
                <Grid item container xs={12} justify="center">
                  <HomeLinkImg imgClassName="logo" />
                </Grid>
                <Grid item container xs={12} justify="center">
                  <Typography className="heading" variant="headline" gutterBottom>Sign in</Typography>
                </Grid>
                <Grid item container xs={10} justify="center">
                  <GoogleSigninButton
                    onSuccess={this.googleSigninSuccess}
                    onError={this.googleSigninError}
                    style={{
                      margin: '0 0 40px 0',
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <form onSubmit={this.signin}>
                    <ErrorList messages={errorMessages} />
                    <FormControl className="form-field" margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        id="email"
                        value={email}
                        type="email"
                        onChange={(e) => { this.updateFormTextFieldState('email', e); }}
                      />
                    </FormControl>
                    <FormControl className="form-field" margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        id="password"
                        value={password}
                        type="password"
                        onChange={(e) => { this.updateFormTextFieldState('password', e); }}
                      />
                    </FormControl>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start"
                      style={{
                        margin: '10px 0 0 0',
                      }}
                    >
                      <Link to="/signup">Create an account</Link>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                      >
                        Sign in
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SigninView.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SigninView);
