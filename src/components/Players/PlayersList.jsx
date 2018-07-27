import React from "react";
import { Component, PropTypes } from "react";
import { Modal } from "../../Content/Modal";
import { Row, Col, Button } from "react-bootstrap";

export class PlayersList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  onAdd() {
    console.log("adasd");
  }

  render() {
    const listt = [];
    const renderr = Object.entries(this.props.players).forEach(
      ([key, value]) => {
        console.log(value);
        if (value.age > 0) {
          listt.push(
            <Col md={8} style={{ minWidth: "500px" }}>
              <div className="card" style={{ width: "200px", float: "left" }}>
                <h1>{value.name}</h1>
                <p className="title">CEO & Founder, Example</p>
                <p>Harvard University</p>
                <p>
                  <Button>Contact</Button>
                </p>
              </div>
            </Col>
          );
        }
      }
    );
    return (
      <div>
        <button
          className="marginleft modalbtn btn btn-success"
          onClick={this.onAdd}
        >
          {"Add"}
        </button>
        <Row>{listt}</Row>
        <h3>asds</h3>

        {/* <Modal
          modalId="editTicket"
          maxWidth="1000px"
          content={<EditTicketForm />}
        /> */}
      </div>
    );
  }
}
