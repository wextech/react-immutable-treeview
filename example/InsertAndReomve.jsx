import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";
import InsertIcon from './InsertIcon'
import RemoveIcon from './RemoveIcon'
class InsertAndReomve extends React.Component {
  constructor() {
    super();
    this.state = {
      treeData: Immutable.fromJS(data),
      newItemForm: Immutable.fromJS({
        title: '',
        key: ''
      }),
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
    this.setState({
      lastNodePath: toggled ? node : null,
      treeData: treeData.setIn(node.concat('activated'), toggled)
    })
  }
  onInsert(e, node) {
    let { newItemForm } = this.state
    let title = newItemForm.get('title')
    let key = newItemForm.get('key')
    if (title == '' || key == '') return
    let { treeData, lastNodePath } = this.state
    if (lastNodePath === null) return
    let insertPath = node.concat('children')
    // let curLayer = node.slice(0, node.length - 2)
    if (treeData.hasIn(insertPath)) {
      let newChild = treeData.getIn(insertPath).filter((item, idx) => item.get('key') != key).concat(Immutable.fromJS([{ title, key }]))
      treeData = treeData.updateIn(insertPath, list => newChild)
    } else {
      treeData = treeData.setIn(insertPath, Immutable.fromJS([{ title, key }]))
    }
    this.setState({
      treeData: treeData.setIn(node.concat('expanded'), true)
    })
  }
  onRemove(e, node) {
    let { treeData, lastNodePath } = this.state
    if (lastNodePath !== null && lastNodePath.length == 0) return
    if (lastNodePath === null) return
    this.setState({
      treeData: treeData.deleteIn(node),
      lastNodePath: null
    })
  }
  chageNewItemField(field, value) {
    let { newItemForm } = this.state
    this.setState({
      newItemForm: newItemForm.set(field, value)
    })
  }
  render() {
    const { treeData, newItemForm } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', marginBottom: '.5rem' }}>
            <div style={{ display: 'flex' }}>
              <input
                type="text" placeholder="请输入value" value={newItemForm.get('title')}
                onChange={e => this.chageNewItemField('title', e.target.value)} />
              <input type="text" placeholder="请输入key"
                onChange={e => this.chageNewItemField('key', e.target.value)}
                value={newItemForm.get('key')} />
              <InsertIcon lastNode={this.state.lastNodePath} onClick={this.onInsert} />
            </div>
            <RemoveIcon lastNode={this.state.lastNodePath} onClick={this.onRemove} />
          </div>
          <ImmutableTree
            data={treeData}
            onExpand={this.onExpand}
            onClick={this.onClick} />
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
export default InsertAndReomve