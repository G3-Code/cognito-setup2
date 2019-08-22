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

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      if (user) {
        this.setAuthStatus(true);
        this.setUser(user);
      } else {
        this.setAuthStatus(false);
        this.setUser(null);
      }
    } catch (error) {
      console.log("Error in CDM is " + error);
    }
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    return (
      <Router>
        <div className="App">
          <header>
            {!authProps.isAuthenticated && (
              <div className="App-header">
                <div
                  className="login_link"
                  onClick={() => Auth.federatedSignIn()}
                >
                  Login-default-customized
                </div>
                <NavLink to="/login" className="login_link">
                  Login with buttons
                </NavLink>
                <NavLink to="/loginCust" className="login_link">
                  Login custom
                </NavLink>
              </div>
            )}
          </header>
        </div>

        <Route
          exact
          path="/login"
          render={props => <LoginForm {...props} auth={authProps} />}
        />
        <Route
          exact
          path="/loginCust"
          render={props => <LoginCustForm {...props} auth={authProps} />}
        />
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
