import React from "react";
import { kidsnParty } from "../../_apis";
import { history } from "../../history";
class NewPassword extends React.Component {
  state = { token: "", password: "", confirmPassword: "", key: "" };

  /**
   * fetch token from server DB according to the user's email address;
   * This token will be used for further validation before submit the request;
   *
   */
  async componentDidMount() {
    const email = this.props.match.params.email;

    try {
      const response = await kidsnParty.get(`/password/${email}`);
      this.setState({ token: response.data.token });
    } catch (error) {
      //   this.handleError();
    }
  }

  handleError = () => {
    alert("your email can not found,please signup first");
    history.push(`${process.env.PUBLIC_URL}/register`);
  };

  /**
   * sumbit new password to server
   * before submit the http request will check 2 conditions;
   * 1. password and confirm password should be matched
   * 2. token and key should be matched.
   *
   * if response success === true redirect to /login
   * else stay in this page
   */
  submit = () => {
    if (parseInt(this.state.token) !== parseInt(this.state.key)) {
      alert(`token is incorrect, please check your email to confirm.`);
      return false;
    }

    if (this.state.password !== this.state.confirmPassword) {
      alert("password not match, please check");
      return false;
    }

    kidsnParty
      .post(`/password`, {
        ...this.state,
        email: this.props.match.params.email
      })
      .then(res => {
        if (res.data.success) {
          alert(
            "your password has been updated, please login with new password."
          );
          history.push(`${process.env.PUBLIC_URL}/login`);
        } else {
          alert("your password has not been updated, please try again later.");
        }
      });
  };
  render() {
    return (
      <div className="component-new-password">
        <h3>Change Password</h3>
        <p>
          *you can find your <span>validate code</span> in your email inbox.
        </p>
        <input
          type="password"
          name="password"
          value={this.state.password}
          placeholder={`please enter new password`}
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <input
          type="password"
          name="confirm_password"
          value={this.state.confirmPassword}
          placeholder={`please re-enter new password`}
          onChange={e => {
            this.setState({ confirmPassword: e.target.value });
          }}
        />
        <input
          type="text"
          name="key"
          value={this.state.key}
          placeholder={`please enter your validate code`}
          onChange={e => {
            this.setState({ key: e.target.value });
          }}
        />
        <div className="button-container">
          <button onClick={this.submit}>confirm</button>
        </div>
      </div>
    );
  }
}

export default NewPassword;
