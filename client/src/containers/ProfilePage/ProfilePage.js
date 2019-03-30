import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import "./ProfilePage.css";
import profile from "../../assets/placeholder.jpg";
import PropTypes from "prop-types";
import Transactions from './Transactions/Transactions';
import ChangeProfile from './ChangeProfile/ChangeProfile';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/UI/Button/Button';
class ProfilePage extends Component {
 
  state = { usr: {},
    transactionsClicked: false,
    changeProfileClicked: false,
    showReported: false,
    usr: null,
    reportedUsers: [],
  };

  componentWillMount = () => {
    try {
      const jwt = localStorage.getItem("token"); //check if token exists
      const user = jwtDecode(jwt); //decode token
      axios.get()
      this.setState({ usr: user }); //webtoken exist, logged in
    } catch (ex) {
      //webtoken do not exist, logged out
    }
  };

  componentDidMount = () => {
    this.callBackendAPI()
      .then(res => {
        console.log(res);
        this.setState({ reportedUsers: res });
      })
      .catch(err => console.log(err));
  };

  callBackendAPI = async () => {
    const response = await axios.get("/api/reports/");
    const body = response.data;

    if (response.status !== 200) {
      throw Error(response.status);
    }
    return body;
  };

  handleUserDelete = async () => {
    const ID = jwtDecode(localStorage.getItem("token")).userID;
    await axios.delete("api/users?userID=" + ID).then(res => {
      localStorage.removeItem("token");
      this.setState({ usr: null });
    });
  };

  handleAdminUserDelete = async (userID) => {
    await axios.delete("api/users?userID=" + userID)
    .then(res => {
      console.log(res);
      this.setState({reportedUsers: this.state.reportedUsers.filter(user => user.reportedUserID !== userID)});
    })
    .catch(err => console.log(err));
  }

  adminPage = () => {
    const reportedUsers = this.state.reportedUsers.map( (user, i) => (
      <li key={i + 9999} style={{fontSize: '20px', marginTop: '20px', color: 'black'}}>
      <b>{user.reportingUser}</b> rappoterte <b>{user.reportedUser}</b><br /><br />
      <b>Grunn:</b> {user.description} <br></br><br></br>
      <Button clicked={() => this.handleAdminUserDelete(user.reportedUserID)}>Slett rappotert bruker</Button>
      </li>
    ));
    return (
      <div>
        <div>
          <img className="profile--image" src={profile} alt="Placeholder" />
        </div>
        <div id="details">
          <h1>Admin</h1>
          <h2>{this.state.usr.firstName + " " + this.state.usr.lastName}</h2>
          <h2>{this.state.usr.phoneNumber}</h2>
        </div>
        <div className="profile container grid-12">
          <div>
            <h4
              onClick={() =>
                this.setState({
                  showReported: !this.state.showReported
                })
              }
              className="profileOption"
            >
              Vis rapporterte brukere
            </h4>
            {this.state.showReported ? <ol>{reportedUsers}</ol> : null}
          </div>
        </div>
      </div>
    );
  };

  userPage = () => {
    return (
      <div>
        <div>
          <img className="profile--image" src={profile} alt="Placeholder" />
        </div>
        <div>
        <div id="details">
          <h2>{this.state.usr.firstName + " " + this.state.usr.lastName}</h2>
          <h2>{this.state.usr.phoneNumber}</h2>
        </div>
        <div className="profile container grid-2">
          <div>
            <h4
              onClick={() =>
                this.setState({
                  transactionsClicked: !this.state.transactionsClicked
                })
              }
              className="profileOption"
            >
              Mine handler
            </h4>
            {this.state.transactionsClicked ? <Transactions /> : null}
          </div>
          <div>
          <h4 onClick={() => this.setState({changeProfileClicked: !this.state.changeProfileClicked} )}className="profileOption">Endre Profil</h4>
        {this.state.changeProfileClicked ? <Redirect push to="/change" /> : null}
            <h4 className="profileOption" onClick={this.handleUserDelete}>
              Slett konto
            </h4>
          </div>
        </div>
      </div>
      </div>
    );
    }
  render() {
    let redirect = false;
    let visiblePage = null;
    //if ((this.state.usr !== null && this.state.usr.isAdmin === 1) ? (this.state.usr !== null))
    if (this.state.usr !== null && this.state.usr.isAdmin === 1) {
      visiblePage = this.adminPage();
    } else if (this.state.usr !== null) {
      visiblePage = this.userPage();
    } else {
      visiblePage = <div>Redirecting...</div>;
      redirect = true;
    }

    if (redirect) {
      return <Redirect push to="/" />;
    }
    return visiblePage;
  }

}

ProfilePage.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  zipCode: PropTypes.string,
  streetName: PropTypes.string,
  isAdmin: PropTypes.string
};

export default ProfilePage;
