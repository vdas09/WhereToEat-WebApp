import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import firebase from "../config/Fire";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleRegister = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase
          .firestore()
          .collection("restauraunt-owners")
          .doc(this.state.email)
          .set({
            value: this.state.email
          })
          .then(() => {
            firebase
              .auth()
              .signOut()
              .then(() => this.props.history.push("/"))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <div className="border w-100 p-5">
          <h1 className="w-100">Register your Restauraunt</h1>
          <Form className="w-100" onSubmit={this.handleRegister}>
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
            <Button color="primary">Sign Up</Button>
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

export default withRouter(Register);
