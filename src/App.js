import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
