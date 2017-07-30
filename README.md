# react-immutable-treeview

[![Build Status](https://travis-ci.org/hapood/react-immutable-treeview.svg?branch=master)](https://travis-ci.org/hapood/react-immutable-treeview) [![Coverage Status](https://coveralls.io/repos/hapood/react-immutable-treeview/badge.svg?branch=master&service=github)](https://coveralls.io/github/hapood/react-immutable-treeview?branch=master)

React Tree View Component. Take Advantage of Immutable.js.

### Install

```
npm install react-immutable-treeview --save
```

### [Example](https://hapood.github.io/react-immutable-treeview/)

An online example from the `/example` directory can be found here: [Here](https://hapood.github.io/react-immutable-treeview/)

### Quick Start
```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import ImmutableTree from 'react-immutable-treeview';
import Immutable from "immutable";

const data = {
  title: "react-immutable-treeview",
  expanded: true,
  activated: true,
  children: [
    {
      title: "normal",
      expanded: true,
      children: [
        {
          title: "normal_child",
          expanded: true
        },
        {
          title: "normal_child_with_data",
          data: {
            anyKey: "nayValue"
          }
        },
        {
          title: "normal_child_with_children",
          expanded: false,
          children: [
            {
              title: "child1"
            },
            {
              title: "child2"
            },
            {
              title: "child3"
            },
            {
              title: "child4"
            }
          ]
        }
      ]
    }
  ]
};

class TreeExample extends React.Component {
    constructor(){
      super();
      this.state = {immutableTreeData:Immutable.fromJS(data)};
      this.onExpand = this.onExpand.bind(this);
    }
    onExpand(e, nodePath, toggled) {
      const { immutableTreeData } = this.state;
      this.setState({
        immutableTreeData: immutableTreeData.setIn(
          nodePath.concat('expanded'), toggled)
      })
    }
    render(){
        return (
            <ImmutableTree
                data={this.state.immutableTreeData}
                onExpand={this.onExpand}
            />
        );
    }
}

const content = document.getElementById('app');
ReactDOM.render(<TreeExample/>, app);
```

### Prop Values

#### data
`PropTypes.oneOfType([ImmutablePropTypes.map, ImmutablePropTypes.list]).isRequired`

Immutable Data that drives the tree view. State-driven effects can be built by manipulating the attributes in this object. An example can be found in `example/data.js`

#### onExpand
`PropTypes.func`

Callback function when expand button of a node is clicked. Passes 3 attributes: dom event object, node path and it's expand boolean state.

#### onClick
`PropTypes.func`

Callback function when label of a node is clicked. Passes 2 attributes: dom event object, node path.

### Data Attributes

```javascript
{
    id: '[optional] string',
    title: 'string',
    children: '[optional] Immutable.List',
    expanded: '[optional] boolean',
    activated: '[optional] boolean',
},
```
#### id
The component key. If not defined, an auto-generated index is used.

#### title
The title prop passed into the TreeNode component.

#### children
The children attached to the node. This value populates the subtree at the specific node. Each child is built from the same basic data structure.

#### expanded
Visibility of a node's children. False by default.

#### activated
If active, the node will be highlighted.