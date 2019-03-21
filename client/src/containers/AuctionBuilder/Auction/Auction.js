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
    formBid: 0
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

  render() {
    if (this.props.endDate > new Date().getTime()) {
      //this.handleEndedAuction();
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
        <p className="auctionImage">Bilde: {this.props.image}</p>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <h4>Nåværende bud:<h5>{this.props.highestBid}kr</h5></h4>
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
