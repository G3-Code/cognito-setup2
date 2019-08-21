import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import { Auth } from "aws-amplify";
import LoginForm from "./components/LoginForm";
import LoginCustForm from "./components/LoginCustForm";
import HomeForm from "./components/HomeForm";

class App extends React.Component {
  state = {
    isAuthenticated: false,
    user: null
  };

  setAuthStatus = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.state.setAuthStatus,
      setUser: this.state.setUser
    };
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="login_link" onClick={() => Auth.federatedSignIn()}>
              Login-default-customized
            </div>
            <NavLink to="/login" className="login_link">
              Login with buttons
            </NavLink>
            <NavLink to="/loginCust" className="login_link">
              Login custom
            </NavLink>
          </header>
        </div>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/loginCust" component={LoginCustForm} />
        <Route
          exact
          path="/home"
          render={props => <HomeForm {...props} auth={authProps} />}
        />
      </Router>
    );
  }
}

export default App;
