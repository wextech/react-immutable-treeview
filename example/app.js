import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";

class DemoTree extends React.Component {
  constructor() {
    super();

    this.state = { treeData: Immutable.fromJS(data) };
    this.onExpand = this.onExpand.bind(this);
  }

  onExpand(node, toggled) {
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }

    this.setState({ cursor: node });
  }

  render() {
    const { treeData } = this.state;

    return (
      <ImmutableTree data={treeData}/>
    );
  }
}

const content = document.getElementById("content");
ReactDOM.render(<DemoTree />, content);
