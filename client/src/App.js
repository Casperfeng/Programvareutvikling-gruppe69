import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import LoginPage from "./components/LoginPage/LoginPage";
import AboutUs from "./components/AboutUs/AboutUs";
import AuctionBuilder from "./containers/AuctionBuilder/AuctionBuilder";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/UI/Footer/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/RegisterUser/RegisterUser";
import LogOut from "./components/LogOut/LogOut";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import ChangeProfile from "./containers/ProfilePage/ChangeProfile/ChangeProfile";

//Main site of the application, this is where we import other components

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token"); //check if token exists
      const user = jwtDecode(jwt); //decode token
      this.setState({ user }); //webtoken exist, logged in
    } catch (ex) {
      //webtoken do not exist, logged out
    }
  }

  render() {
    //can pass user to navbar. Then you can render conditionaly if user exist or not.
    if (this.state.user) {
      try {
        jwtDecode(localStorage.getItem("token"));
      } catch {
        localStorage.removeItem("token");
      }
    }
    return (
      <React.Fragment>
        <Layout />
        <Switch>
          <Route path="/auctions" component={AuctionBuilder} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/logout" exact component={LogOut} />
          <Route path="/myuser" exact component={ProfilePage} />
          <Route path="/contact" exact component={ContactUs} />
          <Route path="/register" component={Register} />
          <Route path="/change" component={ChangeProfile} />
          <Route path="/" component={AboutUs} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
