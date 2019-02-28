import React, { Component } from "react";
import { runInThisContext } from "vm";
import "./AuctionModal.css";
import Button from '../Button/Button';
class AuctionModal extends Component {
  //does not need any info
  state = {
    title: "",
    desc: "",
    image: "",
    startingBid: "",
    highestBid: ""
  };
  handleNameChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDescChange = e => {
    this.setState({ desc: e.target.value });
  };
  handlePictureChange = e => {
    this.setState({ image: e.target.value });
  };
  handleBidChange = e => {
    this.setState({ startingBid: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const desc = this.state.desc;
    const image = this.state.image;
    const bid = this.state.startingBid;
    const auc = {
      id: "123",
      title: title,
      description: desc,
      image: image,
      startingBid: bid,
      highestBid: bid
    };
    this.props.submit(auc);
  };
  render() {
    return (
      <React.Fragment>
        <h4>Skriv inn info om produktet</h4>
        <form className="inputFields">
          <input
            className="inputElementName"
            type="text"
            title="navn"
            placeholder="Navn"
            onChange={this.handleNameChange}
          />
          <input
            className="inputElementDesc"
            type="text"
            title="beskrivelse"
            placeholder="Beskrivelse"
            onChange={this.handleDescChange}
          />
          <input
            className="inputElementImage"
            type="text"
            title="bilde"
            placeholder="Bilde her..."
            onChange={this.handlePictureChange}
          />
          <input
            className="inputElementBid"
            type="number"
            title="minstebud"
            placeholder="Startbud"
            min="1"
            onChange={this.handleBidChange}
          />
          <Button clicked={this.handleSubmit}>Submit</Button>
        </form>
      </React.Fragment>
    );
  }
}
export default AuctionModal;
