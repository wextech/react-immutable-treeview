import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../ImmutableTree";
import data from "./data";
import Immutable from 'immutable'

class DemoTree extends React.Component {
  constructor() {
    super();

    this.state = { data };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
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
    const { data: stateData, cursor } = this.state;

    return (
      <StyleRoot>
        <div style={styles.searchBox}>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
            <input
              className="form-control"
              onKeyUp={this.onFilterMouseUp.bind(this)}
              placeholder="Search the tree..."
              type="text"
            />
          </div>
        </div>
        <div style={styles.component}>
          <Treebeard
            data={data}
            decorators={decorators}
            onToggle={this.onToggle}
          />
        </div>
        <div style={styles.component}>
          <NodeViewer node={cursor} />
        </div>
      </StyleRoot>
    );
  }
}

const content = document.getElementById("content");
ReactDOM.render(<DemoTree />, content);
