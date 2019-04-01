import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import "./RegisterUser.css";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class RegisterUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatedPassword: "",
    zipCode: "",
    streetName: "",
    registeredUser: false,
  };

  validateName = (firstname, lastname) => {
    return (
      firstname.length >= 1 &&
      /^[A-Za-z]+$/.test(firstname) &&
      (lastname.length >= 1 && /^[A-Za-z]+$/.test(lastname))
    );
  };

  validatePhoneNumber = number => {
    return /^[0-9]{8}$/.test(number);
  };

  validateZipCode = zipcode => {
    return zipcode.length >= 3;
  };

  validateStreetName = street => {
    return street.length >= 5;
  };

  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ phoneNumber: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleZipCodeChange = e => {
    this.setState({ zipCode: e.target.value });
  };

  handleStreetNameChange = e => {
    this.setState({ streetName: e.target.value });
  };

  handleRepeatPasswordChange = e => {
    this.setState({ repeatedPassword: e.target.value });
  };

  handleSubmit = e => {
    if (
          this.validateEmail(this.state.email) 
    && this.validateName(this.state.firstName, this.state.lastName)
    && this.validatePhoneNumber(this.state.phoneNumber)
    && this.validateStreetName(this.state.streetName)
    && this.validateZipCode(this.state.zipCode)
    ){
    axios
      .post("/api/users/register", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        password: this.state.password,
        zipCode: this.state.zipCode,
        streetName: this.state.streetName
      })
      .then(response => {
        console.log(response);
        this.setState({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          password: "",
          repeatedPassword: "",
          zipCode: "",
          streetName: "",
          validState: false,
          registeredUser: true,
      });
      })
      .catch(error => {
        console.log(error);
        this.setState({registeredUser: false});
      });
    }
  };

  render() {
    
    if (this.state.registeredUser){
      return <Redirect push to="/" />;
    }

    return (
      <div className="registerUser">
        <form className="registerForm">
          <h1 className="registerTitle">Registrer bruker her</h1>
          <input
            type="text"
            className="loginInput"
            placeholder="Fornavn"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          />
            <p className="errorMsg">{this.state.firstName >=1 ? "Fyll inn gyldig fornavn" : null}</p>
          <input
            type="text"
            className="loginInput"
            placeholder="Etternavn"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
          />
            <p className="errorMsg">{this.state.lastName >=1 ? "Fyll inn gyldig etternavn" : null}</p>
          <input
            type="text"
            className="loginInput"
            placeholder="Telefonnummer"
            value={this.state.phoneNumber}
            onChange={this.handleNumberChange}
          />
        <p className="errorMsg">{!this.validatePhoneNumber(this.state.phoneNumber) ? "Fyll inn gyldig telefonnummer" : null}</p>
          <input
            type="text"
            className="loginInput"
            placeholder="Addresse"
            value={this.state.streetName}
            onChange={this.handleStreetNameChange}
          />
         <p className="errorMsg">{!this.validateStreetName(this.state.streetName) ? "Fyll inn gyldig gate" : null}</p>
          <input
            type="text"
            className="loginInput"
            placeholder="Postnummer"
            value={this.state.zipCode}
            onChange={this.handleZipCodeChange}
          />
         <p className="errorMsg">{!this.validateZipCode(this.state.zipCode) ? "Fyll inn gyldig postnummer" : null}</p>
          <input
            type="text"
            className="loginInput"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <p className="errorMsg">{!this.validateEmail(this.state.email) ? "Fyll inn gyldig epost" : null}</p>
          <input
            type="password"
            className="loginInput"
            placeholder="Passord"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input
            type="password"
            className="loginInput"
            placeholder="Gjenta passord"
            value={this.state.repeatedPassword}
            onChange={this.handleRepeatPasswordChange}
          />
        <p className="errorMsg">{this.state.password !== this.state.repeatedPassword ? "Gjenta passordet" : null}</p>
        </form>
        <Button className="registerButton" clicked={this.handleSubmit}>
          Bekreft
        </Button>
      </div>
    );
  }
}

RegisterUser.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  repeatedPassword: PropTypes.string,
  zipCode: PropTypes.string,
  streetName: PropTypes.string,
  validState: PropTypes.bool
};

export default RegisterUser;

//Send API to api/users/register
