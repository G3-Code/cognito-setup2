import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import { Auth } from "aws-amplify";
import LoginForm from "./components/LoginForm";
import LoginCustForm from "./components/LoginCustForm";

function App() {
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
    </Router>
  );
}

export default App;
