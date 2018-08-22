import React from 'react';
import { Redirect } from 'react-router-dom';

class SignupView extends React.Component {
  static elementizeErrorMessages(messages = []) {
    return messages.map(m => <li className="error-message" key={m}>{m}</li>);
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessages: [],
      shouldRedirect: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    const { email, password } = this.state;

    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(async (res) => {
      // use res.ok since 400-600 codes do not trigger catch
      if (res.ok) {
        this.setState({ shouldRedirect: true });
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

  handleEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    const {
      errorMessages,
      shouldRedirect,
    } = this.state;
    const redirect = <Redirect to="/" />;
    const signup = (
      <div id="signup" className="view">
        <form onSubmit={this.submitForm}>
          <ul>
            {SignupView.elementizeErrorMessages(errorMessages)}
          </ul>
          <label htmlFor="email">
            Email
            <input type="email" onInput={this.handleEmail} id="email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" onInput={this.handlePassword} id="password" />
          </label>
          <input type="submit" value="Signup" />
        </form>
      </div>
    );

    return shouldRedirect
      ? (redirect)
      : (signup);
  }
}

export default SignupView;
