import React from "react";
import PropTypes from "prop-types";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import BaseImmutableTree from "./BaseImmutableTree";
import Immutable from "immutable";

export default class ImmutableTree extends React.Component {
  eventFunctionFactory(onEventType) {
    return function(e, subNodePath, flag) {
      if (this.props[onEventType] == null) return;
      if (Immutable.Iterable.isIndexed(this.props.data)) {
        this.props[onEventType](
          e,
          subNodePath,
          flag,
          this.props.data.get(subNodePath)
        );
      } else {
        let nodePath = subNodePath.slice(2);
        if (nodePath.length !== 0) {
          nodePath = ["children"].concat(nodePath);
        }
        this.props[onEventType](
          e,
          nodePath,
          flag,
          this.props.data.get(subNodePath)
        );
      }
    };
  }

  constructor(props) {
    super(props);
    this.onClick = this.eventFunctionFactory("onClick").bind(this);
    this.onExpand = this.eventFunctionFactory("onExpand").bind(this);
    this.onCheck = this.eventFunctionFactory("onCheck").bind(this);
  }

  render() {
    const props = this.props;
    let { data, options, keyField } = props;
    if (!Immutable.Iterable.isIndexed(data)) {
      data = Immutable.List.of(data);
    }
    return (
      <BaseImmutableTree
        data={data}
        expanded={true}
        options={options}
        onClick={this.onClick}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        paddingLeft={0}
      />
    );
  }
}

ImmutableTree.propTypes = {
  options: PropTypes.any,
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func
};

ImmutableTree.defaultProps = { options: {} };
