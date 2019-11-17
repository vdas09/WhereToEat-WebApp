import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

import firebase from "../config/Fire";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSignIn = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log(user))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <div className="border w-100 p-5">
          <h1 className="w-100">Sign In</h1>
          <Form className="w-100" onSubmit={this.handleSignIn}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </FormGroup>
            <Button>Sign In</Button>
          </Form>
          <div className="w-100 mt-2">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
