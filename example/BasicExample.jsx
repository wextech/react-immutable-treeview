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
    this.onRemove = this.onRemove.bind(this)
    this.onInsert = this.onInsert.bind(this)
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
  onInsert(e, node) {
    let { treeData, lastNodePath } = this.state
    if (lastNodePath === null) return
    let insertPath = node.concat('children')

    this.setState({
      treeData: (treeData.hasIn(insertPath) ? treeData.updateIn(insertPath,
        list => list.push(Immutable.Map({ title: 'new item' }))
      ) : treeData.setIn(insertPath, Immutable.fromJS([{ title: 'new item' }]))).setIn(node.concat('expanded'), true)
    })
  }
  onRemove(e, node) {
    let { treeData, lastNodePath } = this.state
    if (lastNodePath === null) return
    this.setState({
      treeData: treeData.deleteIn(node)
    })
  }
  render() {
    const { treeData } = this.state;

    return (
      <div>
        <div style={{ width: '20%', boxSizing: 'border-box' }}>
          <ImmutableTree
            data={treeData}
            onExpand={this.onExpand}
            onClick={this.onClick}
            onInsert={this.onInsert}
            onRemove={this.onRemove}
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