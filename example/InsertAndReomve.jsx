import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";
import InsertIcon from "./InsertIcon";
import RemoveIcon from "./RemoveIcon";

function addKeyToTreeNode(data, state) {
  if (data == null) return;
  if (Array.isArray(data)) {
    let newArray = data.map(node => addKeyToTreeNode(node, state));
    return newArray;
  } else {
    let newData = Object.assign({}, data, {
      id: state.key++,
      children: addKeyToTreeNode(data.children, state)
    });
    return newData;
  }
}

class InsertAndReomve extends React.Component {
  constructor() {
    super();
    this.state = {
      newItemForm: Immutable.fromJS({
        title: "",
        key: ""
      }),
      lastNodePath: [],
      key: 0
    };
    this.state.treeData = Immutable.fromJS(addKeyToTreeNode(data, this.state));
    this.onExpand = this.onExpand.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onInsert = this.onInsert.bind(this);
  }

  onExpand(e, nodePath, toggled) {
    const { treeData } = this.state;
    this.setState({
      treeData: treeData.setIn(nodePath.concat("expanded"), toggled)
    });
  }

  onClick(e, nodePath, toggled, value) {
    let { treeData, lastNodePath } = this.state;
    if (lastNodePath && treeData.hasIn(lastNodePath)) {
      treeData = treeData.setIn(lastNodePath.concat("activated"), false);
    }
    this.setState({
      lastNodePath: toggled ? nodePath : null,
      treeData: treeData.setIn(nodePath.concat("activated"), toggled)
    });
  }

  onInsert(e, nodePath) {
    let { newItemForm } = this.state;
    let title = newItemForm.get("title");
    if (title == '') return
    let key = this.state.key++;
    let { treeData, lastNodePath } = this.state;
    let insertPath = nodePath.concat("children");
    if (treeData.getIn(insertPath)) {
      treeData = treeData.updateIn(insertPath, list =>
        list.push(Immutable.fromJS({ title, id: key }))
      );
    } else {
      treeData = treeData.setIn(insertPath, Immutable.fromJS([{ title, key }]));
    }
    this.setState({
      treeData: treeData.setIn(nodePath.concat("expanded"), true)
    });
  }

  onRemove(e, nodePath) {
    let { treeData, lastNodePath } = this.state;
    if (lastNodePath !== null && lastNodePath.length == 0) return;
    if (lastNodePath === null) return;
    this.setState({
      treeData: treeData.deleteIn(nodePath),
      lastNodePath: null
    });
  }
  chageNewItemField(field, value) {
    let { newItemForm } = this.state;
    this.setState({
      newItemForm: newItemForm.set(field, value)
    });
  }
  render() {
    const { treeData, newItemForm } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", marginBottom: ".5rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ paddingRight: "1rem" }}>title:</span>
              <input
                type="text"
                value={newItemForm.get("title")}
                onChange={e => this.chageNewItemField("title", e.target.value)}
              />
              <InsertIcon
                lastNode={this.state.lastNodePath}
                onClick={this.onInsert}
              />
            </div>
            <RemoveIcon
              lastNode={this.state.lastNodePath}
              onClick={this.onRemove}
            />
          </div>
          <ImmutableTree
            data={treeData}
            onExpand={this.onExpand}
            onClick={this.onClick}
          />
        </div>
        <pre style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
          {JSON.stringify(treeData, null, 2)}
        </pre>
      </div>
    );
  }
}
export default InsertAndReomve;
