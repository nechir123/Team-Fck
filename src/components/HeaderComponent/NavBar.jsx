import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, logout } from "../../store/auth/actions";
// import loginRootSaga from "../../saga/AuthSaga";
import { Button } from "react-bootstrap";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">FCK</a>
          </div>
          <ul className="nav navbar-nav navbar-left">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/players">Players</Link>
            </li>
            <li>
              <Link to="/addplayer">Addplayer</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <Button onClick={this.props.login} disabled={this.props.loggedIn}>
              Login
            </Button>
            <Button onClick={this.props.logout} disabled={!this.props.loggedIn}>
              Logout
            </Button>

            <p>
              User: {this.props.user ? this.props.user.displayName : "none"}
            </p>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user
});
const mapDispatchToProps = {
  login,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
