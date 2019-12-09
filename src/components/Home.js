import React, { Component } from "react";
import firebase from "../config/Fire";
import { Button, Table } from "reactstrap";

class Home extends Component {
  state = {
    email: "",
    restaurantName: "",
    queries: [],
    loaded: false
  };

  getUserRestaurant() {
    const userEmail = firebase.auth().currentUser.email;
    let userRestaurant = "";
    let restaurantQueries = [];

    firebase
      .firestore()
      .collection("restauraunt-owners")
      .where("restaurantEmail", "==", userEmail)
      .limit(1)
      .get()
      .then(
        function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            userRestaurant = doc.data().restaurantName;
          });
          this.setState(
            {
              email: userEmail,
              restaurantName: userRestaurant
            },
            this.getRestaurantQueries
          );
        }.bind(this)
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  getRestaurantQueries() {
    const { restaurantName } = this.state;
    let restaurantQueries = [];

    firebase
      .firestore()
      .collection("queries-2")
      .doc(restaurantName)
      .collection("entries")
      .orderBy("qTimeStamp", "desc")
      .get()
      .then(
        function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            restaurantQueries.push(doc.data());
          });
          this.setState({
            queries: restaurantQueries,
            loaded: true
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  renderQueryData() {
    const { queries } = this.state;
    return queries.map((item, index) => {
      const { qTimeStamp } = item;
      console.log(qTimeStamp);
      const time = new Date(qTimeStamp.seconds * 1000);
      return (
        <tr key={index}>
          <td>{item.qCuisineType}</td>
          <td>{item.qPrice}</td>
          <td>{item.qUser}</td>
          <td>{time.toLocaleString()}</td>
        </tr>
      );
    });
  }

  componentDidMount() {
    this.getUserRestaurant();
  }

  render() {
    const { email, restaurantName, queries, loaded } = this.state;
    return (
      <div className="mt-4">
        <h5 className="text-muted">Hello, {email}</h5>
        <h4> Welcome to your Dashboard for {restaurantName} </h4>
        <Button
          className="mt-2"
          onClick={() => firebase.auth().signOut()}
          color="primary"
        >
          Sign Out
        </Button>
        <br />
        <h3 className="mt-4">Here's how you were found</h3>
        <br />
        {loaded ? (
          <Table>
            <thead>
              <tr>
                <th>Cuisine Type</th>
                <th>Max Price</th>
                <th>User Email</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>{this.renderQueryData()}</tbody>
          </Table>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Home;
