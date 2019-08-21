import React from "react";

import "./App.css";
import { Auth } from "aws-amplify";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div onClick={() => Auth.federatedSignIn()}>Login-default</div>
      </header>
    </div>
  );
}

export default App;
