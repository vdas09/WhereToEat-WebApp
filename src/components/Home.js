import React, { Component } from "react";
import firebase from "../config/Fire";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p onClick={() => firebase.auth().signOut()}>Click here to logout</p>
      </div>
    );
  }
}

export default Home;
