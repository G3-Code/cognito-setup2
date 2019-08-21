import React from "react";
import { Auth } from "aws-amplify";

const LoginForm = () => {
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
      </div>
    </div>
  );
};
export default LoginForm;
