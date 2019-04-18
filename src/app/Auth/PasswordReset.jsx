import React from "react";
import { history } from "../../history";

class PasswordReset extends React.Component {
  state = { email: "" };
  render() {
    return (
      <div className="component-reset-password">
        <h3>Password Reset</h3>
        <p>
          *please enter your email address which is used for signing up your
          accout. We will send a password reset code to your email address.
        </p>

        <input
          type="text"
          name="email"
          value={this.state.email}
          placeholder={`enter your email address`}
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
        />
        <div className="button-container">
          <button
            onClick={() => {
              history.push(
                `${process.env.PUBLIC_URL}/newpassword/${this.state.email}`
              );
            }}
          >
            confirm
          </button>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
