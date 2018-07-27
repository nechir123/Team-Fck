import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PlayersList } from "./PlayersList.jsx";
import { InfoBox } from "../../Content/InfoBox";
import {
  getPlayers,
  playersSuccess,
  playersFailure
} from "../../../src/store/players/actions";
import { Button } from "react-bootstrap";
class Players extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    getPlayers: PropTypes.func.isRequired,
    playersSuccess: PropTypes.func.isRequired,
    playersFailure: PropTypes.func.isRequired,
    players: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getPlayers();
  }
  render() {
    const a = "asdsd";
    return (
      <InfoBox title="Players">
        <PlayersList players={this.props.players} />
      </InfoBox>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
  players: state.players.players
});
const mapDispatchToProps = {
  getPlayers,
  playersSuccess,
  playersFailure
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
