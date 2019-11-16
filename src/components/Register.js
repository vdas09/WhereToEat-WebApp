import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSignIn = e => {
    e.preventDefault();
    alert(
      this.state.restaurauntName +
        " " +
        this.state.email +
        " " +
        this.state.password
    );
  };

  render() {
    return (
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <div className="border w-100 p-5">
          <h1 className="w-100">Register your Restauraunt</h1>
          <Form className="w-100" onSubmit={this.handleSignIn}>
            <FormGroup>
              <Label for="restaurauntName">Restauraunt Name</Label>
              <Input
                type="text"
                name="restaurauntName"
                id="restaurauntName"
                required
                placeholder="Enter Resturaunt Name"
                onChange={this.handleChange}
                value={this.state.restaurauntName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                required
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
                placeholder="Enter Password"
                required
                onChange={this.handleChange}
                value={this.state.password}
              />
            </FormGroup>
            <Button>Sign Up</Button>
          </Form>
          <div className="w-100 mt-2">
            <p>
              Already have an account? <Link to="/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
