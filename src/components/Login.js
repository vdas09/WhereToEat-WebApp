import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

import firebase from "../config/Fire";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMsg: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSignIn = e => {
    this.setState({ errMsg: null });
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log(user))
      .catch(err => {
        this.setState({ errMsg: "Invalid credentials" });
      });
  };

  render() {
    return (
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <h4 class="text-center">WhereToEat Restaurant Owner Dashboard</h4>
        <p className="text-muted text-center">
          For demo purposes, feel free to login as{" "}
          <code>&lt;testingmadras@gmail.com&gt;</code> with password of{" "}
          <code>&lt;password&gt;</code>.
        </p>
        <div className="border w-100 p-5 mt-2">
          <h4 className="w-100">Sign In</h4>
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
            <Button color="primary">Sign In</Button>
          </Form>
          <div className="w-100 mt-2">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            <p className="text-danger">{this.state.errMsg}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
