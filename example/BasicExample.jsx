import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";

class BasicExample extends React.Component {
  constructor() {
    super();
    this.state = {
      treeData: Immutable.fromJS(data),
      lastNodePath: []
    };
    this.onExpand = this.onExpand.bind(this);
    this.onClick = this.onClick.bind(this)
  }
  onExpand(e, node, toggled) {
    const { treeData } = this.state;
    this.setState({
      treeData: treeData.setIn(node.concat('expanded'), toggled)
    })
  }

  onClick(e, node, toggled, value) {
    let { treeData, lastNodePath } = this.state;
    if (lastNodePath && treeData.hasIn(lastNodePath)) {
      treeData = treeData.setIn(lastNodePath.concat('activated'), false)
    }
    this.setState({ lastNodePath: toggled ? node : null, treeData: treeData.setIn(node.concat('activated'), toggled) })
  }
  render() {
    const { treeData } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', boxSizing: 'border-box' }}>
          <ImmutableTree
            data={treeData}
            onExpand={this.onExpand}
            onClick={this.onClick}
            lastNode={this.state.lastNodePath} />
        </div>
        <pre style={{ paddingTop: '2rem', paddingLeft: '2rem' }}>
          {
            JSON.stringify(
              treeData,
              null,
              2
            )
          }
        </pre>
      </div>
    );
  }
}
export default BasicExample