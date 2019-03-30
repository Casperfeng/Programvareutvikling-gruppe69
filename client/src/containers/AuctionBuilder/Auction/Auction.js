import React, { Component } from "react";
import "./Auction.css";
import Button from "../../../components/UI/Button/Button";
import CountdownTimer from "../../../components/UI/CountdownTimer/CountdownTimer";
import axios from "axios";

class Auction extends Component {
  state = {
    productID: this.props.productID,
    title: this.props.title,
    description: this.props.description,
    image: this.props.image,
    highestBid: this.props.highestBid,
    highestBidder: this.props.highestBidder,
    startingBid: this.props.startingBid,
    sellerID: this.props.sellerID,
    endDate: this.props.endDate,
    key: this.props.key,
    formBid: 0,
    location: ""
  };

  handleBidChange = e => {
    this.setState({ formBid: e.target.value });
  };

  handleBidClick = () => {
    this.props.onBid(this.state.productID, this.state.formBid);
  };
  handleEndedAuction = () => {
    axios
      .post("/api/orders/insertOrder", {
        productID: this.state.productID,
        sellerID: this.state.sellerID,
        highestBidderID: this.state.highestBidder
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleFindLocation = () => {
    axios
      .get("/api/users/location?userID=" + this.state.sellerID)
      .then(response => {
        this.setState({
          location:
            "https://maps.googleapis.com/maps/api/staticmap?center=" +
            response.data.streetName +
            "," +
            response.data.zipCode +
            "&size=600x300&key=AIzaSyCcGoNSAq9a12Md2nL_qYz35U_SzYWrXeI"
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    if (this.props.endDate > new Date().getTime()) {
      //this.handleEndedAuction();
    }
    if (this.state.location === "") {
      this.handleFindLocation();
    }

    return (
      <div className="auction">
        {this.props.endDate > new Date().getTime() ? (
          <CountdownTimer
            auctionTime={this.props.endDate - new Date().getTime()}
          />
        ) : (
          <div>
            <h2>Auksjonen er avsluttet!</h2>
          </div>
        )}
        <span className="auctionImage">
          <img
            src={"data:image/jpeg;base64," + this.props.image}
            alt="product"
          />
        </span>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <h4>
          Nåværende bud:<h5>{this.props.highestBid}kr</h5>
        </h4>
        <br />
        <p>
          <a href={this.state.location} target="_blank">
            Se kart her
          </a>
        </p>
        <div className="footer">
          {localStorage.getItem("token") === null ? null : (
            <React.Fragment>
              <input
                className="bidInputField"
                type="number"
                title="bud"
                placeholder="Legg inn bud her"
                onChange={this.handleBidChange}
              />
              <Button className="auctionButton" clicked={this.handleBidClick}>
                Legg inn bud
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Auction;
