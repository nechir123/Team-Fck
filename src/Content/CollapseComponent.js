// @flow
import React from "react";
import { Collapse, Well, Button } from "react-bootstrap";

type State = {
  // Is open or not.
  open: boolean
};

type Props = {
  // Title of collapse
  title: string,

  // Collapsed content
  content: string
};

// Collapse component
export class CollapseComponent extends React.Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: this.props.title,
      content: this.props.content
    };
  }

  componentWillReceiveProps(props) {
    if (
      props.title !== this.props.title ||
      props.content !== this.props.content
    ) {
      this.setState({
        title: props.title,
        content: props.content
      });
    }
  }

  onOpenStateChange() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let spanClass = this.state.open
      ? "glyphicon glyphicon-menu-up"
      : "glyphicon glyphicon-menu-down";

    return (
      <div className={this.props.style}>
        <h3
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={this.onOpenStateChange.bind(this)}
        >
          <span className={spanClass} /> {this.state.title}
        </h3>
        <Collapse in={this.state.open}>
          <div>{this.state.content}</div>
        </Collapse>
      </div>
    );
  }
}
