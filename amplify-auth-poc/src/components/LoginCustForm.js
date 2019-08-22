import React from "react";
import { Auth } from "aws-amplify";

class LoginCustForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log("SIGN UP EVENT");
    console.log(email[0], password[0]);
    try {
      const signUpResponse = await Auth.signUp({
        username: email[0],
        password: password[0],
        attributes: {
          email: email[0]
        }
      });
      console.log(signUpResponse);
      this.props.history.push("/home");
    } catch (error) {
      // let err = null;
      // !error.message ? (err = { message: error }) : (err = error);
      console.log("Error is " + error.message);
    }
  };

  handleSignIn = async event => {
    event.preventDefault();
    console.log("SIGN IN EVENT");
    console.log("Email / user name is " + this.state.email.toString());
    console.log("password is " + this.state.password);
    try {
      const user = await Auth.signIn(
        this.state.email.toString(),
        this.state.password
      );
      console.log(user);
      this.props.auth.setAuthStatus(true);
      console.log("auth status is set");
      this.props.auth.setUser(user);
      console.log("user is set");
      this.props.history.push("/home");
    } catch (error) {
      // let err = null;
      // !error.message ? (err = { message: error }) : (err = error);
      console.log("Error is " + error.message);
    }
  };

  handleGoogleSignIn = async event => {
    event.preventDefault();
    try {
      console.log("IN GOOGLE SIGN IN ");
      await Auth.federatedSignIn({ provider: "Google" });
      // console.log(user);
      // this.props.auth.setAuthStatus(true);
      // console.log("auth status is set");
      // this.props.auth.setUser(user);
      // console.log("user is set");
      // this.props.history.push("/home");
    } catch (error) {
      console.log("Error is " + error);
    }
  };

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
          <form>
            <div>
              <input
                className="input-txt"
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
                className="input-txt"
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
              <button className="signup-btn" onClick={this.handleSignUp}>
                Sign Up
              </button>

              <button className="signin-btn" onClick={this.handleSignIn}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// async function signUp(username, email, password) {
//   try {
//     console.log("------email is " + username);
//     console.log("------email is " + email);
//     console.log("-------password is " + password);
//     await Auth.signUp({
//       username: "username",
//       email,
//       password,
//       attributes: { email }
//     });
//     console.log("sign up success!");
//   } catch (err) {
//     console.log("error signing up..", err);
//   }
// }
export default LoginCustForm;
