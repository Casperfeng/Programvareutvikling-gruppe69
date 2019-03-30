import React, { Component } from "react";
import "./Transaction.css";
import Button from '../../../../components/UI/Button/Button';
import axios from 'axios';

class Transaction extends Component {
  
  /*This is an example of how to recieve data from the server.
   Props now have the following properties: 
   seller : "full name of seller"
   sellerEMail
   buyer : "full name of buyer"
   buyerEmail
   product : title of the transaktion product
   price : the agreed price on product
   isSeller : 0 or 1 dependent on if the logged in user is the seller or not(to customize how the data is displayed)
   */
  state = {
    desc: '',
    isReporting: false,  
  };
  
  handleChange = (e) => {
    this.setState({desc: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/reports/newReport/', {
      reportedUserID: !this.props.isSeller ? this.props.buyerID : this.props.sellerID,
      reportingUserID: !this.props.isSeller ? this.props.sellerID : this.props.buyerID,
      productID: this.props.productID,
      description: this.state.desc
    }).then(res => {console.log(res);
    this.setState({isReporting: false})}).catch(err => console.log(err));
  }

  render(){ 
    const reportForm = (
    <div>
    <textarea rows="4" cols="50" placeholder="Skriv inn begrunnelse for rapportering her..." className="reportForm" onChange={this.handleChange}>
    </textarea>
    <div>
    <Button clicked={this.handleSubmit}>Bekreft</Button>
    </div>
    </div>);


    return (
      <div>
    <p>
      {!this.props.isSeller ? `Du solgte ${this.props.product} til ${this.props.buyer} for ${this.props.price}` : `Du kjøpte ${this.props.product} fra ${this.props.seller} for ${this.props.price}`}
    </p>
      <div>
        <Button clicked={() => this.setState({isReporting: !this.state.isReporting})}>Rapporter</Button>
      </div>
      {this.state.isReporting ? 
      reportForm : null }
      </div>
  );
}
}

export default Transaction;
