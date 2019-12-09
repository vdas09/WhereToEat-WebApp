import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import firebase from "../config/Fire";

class Register extends Component {
  state = {
    email: "",
    password: "",
    restaurantName: "",
    errorMsg: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleRegister = e => {
    this.setState({ errorMsg: null });
    const { email, restaurantName } = this.state;
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase
          .firestore()
          .collection("restauraunt-owners")
          .add({
            restaurantName: restaurantName,
            restaurantEmail: email
          })
          .then(
            function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              this.props.history.push("/");
            }.bind(this)
          )
          .catch(function(error) {
            this.setState({ errorMsg: "Registration failed." });
          });
      })
      .catch(err => {
        this.setState({ errorMsg: "Registration failed." });
      });
  };

  render() {
    return (
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <h1>WhereToEat Restaurant Owner Dashboard</h1>
        <div className="border w-100 p-5 mt-4">
          <h1 className="w-100">Register your Restaurant</h1>
          <Form className="w-100" onSubmit={this.handleRegister}>
            <FormGroup>
              <Label for="restaurantName">Restaurant Name</Label>
              <Input
                type="text"
                name="restaurantName"
                id="restaurantName"
                required
                placeholder="Enter Restaurant Name"
                onChange={this.handleChange}
                value={this.state.restaurantName}
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
            <p className="text-danger">{this.state.errorMsg}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
