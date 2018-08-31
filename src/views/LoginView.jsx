import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GoogleSigninButton from '../components/GoogleSigninButton';
import ErrorList from '../components/ErrorList';
import fakeLogo from '../../static/images/fake-logo.svg';
import fetchOptions from '../utils/fetch';


class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
      errorMessages: [],
    };

    this.login = this.login.bind(this);
    this.googleSigninSuccess = this.googleSigninSuccess.bind(this);
    this.googleSigninError = this.googleSigninError.bind(this);
  }

  updateFormTextFieldState(stateKey, event) {
    event.preventDefault();
    this.setState({
      [stateKey]: event.target.value,
    });
  }

  login(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const payload = {
      email,
      password,
    };

    fetch('/api/auth/login', new fetchOptions.Post(payload))
      .then(async (res) => {
        if (res.ok) {
          this.setState({
            shouldRedirect: true,
          });
        } else if (res.status === 400) {
          const body = await res.json();
          this.setState({
            errorMessages: body.messages,
          });
        }
      }).catch(console.error);
  }

  googleSigninSuccess() {
    this.setState({
      shouldRedirect: true,
    });
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
      shouldRedirect,
      errorMessages,
    } = this.state;

    if (shouldRedirect) {
      return (<Redirect to="/" />);
    }

    return (
      <Grid container id="login-view" justify="center">
        <Grid item xs={12} sm={8} lg={6}>
          <Paper className="base-paper">
            <Grid
              container
              justify="center"
            >
              <Grid item container xs={12} justify="center">
                <img src={fakeLogo} className="logo" alt="Logo" />
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
                <form onSubmit={this.login}>
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
                      Login
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default LoginView;
