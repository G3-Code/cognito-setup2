import React from "react";
import { Auth } from "aws-amplify";

class LoginCustForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }
  render() {
    return (
      <div className="body_content">
        <div className="signin_content">
          <div>
            <button
              className="loginBtn loginBtn--facebook"
              onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
            >
              Login with facebook
            </button>
          </div>
          <div>
            <button
              className="loginBtn loginBtn--google"
              onClick={() => Auth.federatedSignIn({ provider: "Google" })}
            >
              Login with Google
            </button>
          </div>
          <div className="hr_bar" />
          <div>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={e => {
                e.persist();
                this.setState({
                  [e.target.name]: [e.target.value]
                });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={e => {
                e.persist();
                this.setState({
                  [e.target.name]: [e.target.value]
                });
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={e => {
                e.persist();
                this.setState({
                  [e.target.name]: [e.target.value]
                });
              }}
            />
          </div>
          <div>
            <button
              onClick={() =>
                signUp(
                  this.state.username,
                  this.state.email,
                  this.state.password
                )
              }
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

async function signUp(username, email, password) {
  try {
    console.log("------email is " + username);
    console.log("------email is " + email);
    console.log("-------password is " + password);
    await Auth.signUp({
      username: "username",
      email,
      password,
      attributes: { email }
    });
    console.log("sign up success!");
  } catch (err) {
    console.log("error signing up..", err);
  }
}
export default LoginCustForm;
