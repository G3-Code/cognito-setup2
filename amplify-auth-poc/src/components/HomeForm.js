import React from "react";
import "../App.css";
import { Auth } from "aws-amplify";

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      if (user) {
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user);
      }
    } catch (error) {
      console.log("Error in CDM is " + error);
    }
  }
  handleLogout = async event => {
    event.preventDefault();
    try {
      await Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push("/");
    } catch (error) {
      console.log("Error is " + error);
    }
  };
  render() {
    return (
      <div>
        {this.props.auth.user && (
          <div>
            <div className="welcome-user">
              Hello! {this.props.auth.user.attributes.email}
            </div>
            <button className="logout-btn" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default HomeForm;
