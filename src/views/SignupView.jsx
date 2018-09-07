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
import validate from 'validator';
import fetchOptions from '../utils/fetch';
import ErrorList from '../components/presentational/ErrorList';
import HomeLinkImg from '../components/presentational/HomeLinkImg';
import { setAuthFlag } from '../store/actions/actionCreators';

function validateEmail(v) {
  return validate.isEmail(v);
}

function validateName(v) {
  return !(validate.isEmpty(v));
}

function validatePassword(v) {
  return String(v).length > 7;
}

class SignupView extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      errorMessages: [],
      dirty: {
        email: false,
        name: false,
        password: false,
      },
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateFormTextFieldState = this.updateFormTextFieldState.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    const { email, password, name } = this.state;
    const payload = { email, password, name };

    fetch('/api/auth/signup', new fetchOptions.Post(payload))
      .then(async (res) => {
        // use res.ok since 400-600 codes do not trigger catch
        if (res.ok) {
          const { history, dispatch } = this.props;
          dispatch(setAuthFlag(true));
          history.replace('/');
        } else {
          const { messages } = await res.json();
          this.setState({
            errorMessages: messages,
          });
        }
      })
      .catch(() => {
        this.state.errorMessage = ['network error'];
      });
  }

  updateFormTextFieldState(stateKey, event) {
    event.preventDefault();
    const { value } = event.target;
    const { dirty } = this.state;

    this.setState({
      [stateKey]: value,
      dirty: Object.assign(dirty, {
        [stateKey]: true,
      }),
    });
  }

  render() {
    const {
      errorMessages,
      name,
      email,
      password,
      dirty,
    } = this.state;

    const errorStates = {
      name: dirty.name && !validateName(name),
      email: dirty.email && !validateEmail(email),
      password: dirty.password && !validatePassword(password),
    };

    return (
      <Grid container direction="column" justify="center" style={{ height: '100%' }}>
        <Grid container item id="signup" className="view" justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper className="base-paper">
              <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
              >
                <HomeLinkImg imgClassName="logo" />
                <Typography className="heading" variant="headline">Create an Account</Typography>

                <Grid container justify="center">
                  <Grid item xs={10}>
                    <form id="manual-signup" onSubmit={this.submitForm}>
                      <ErrorList messages={errorMessages} />
                      <FormControl
                        margin="normal"
                        error={errorStates.name}
                        required
                        fullWidth
                      >
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => { this.updateFormTextFieldState('name', e); }}
                          placeholder="John Smith"
                        />
                      </FormControl>

                      <FormControl
                        margin="normal"
                        error={errorStates.email}
                        required
                        fullWidth
                      >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                          id="email"
                          value={email}
                          type="email"
                          onChange={(e) => { this.updateFormTextFieldState('email', e); }}
                          placeholder="john@domain.com"
                        />
                      </FormControl>

                      <FormControl
                        margin="normal"
                        error={errorStates.password}
                        required
                        fullWidth
                      >
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
                        <Link data-testid="signin" to="/signin">Already have an account?</Link>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="large"
                        >
                          Signup
                        </Button>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SignupView.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SignupView);
