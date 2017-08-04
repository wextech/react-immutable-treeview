import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import BaseImmutableTree from "./BaseImmutableTree";
import Immutable from "immutable";
import defaultOptions from "../defaultOptions.js";

const heightMatchExp = /(\d*)(\.\d*)?(\w*)/;

function transformOptions(options) {
  let [_, numberPart1, numberPart2, heightUnit] = options.nodeHeight.match(
    heightMatchExp
  );
  let wholeNumber =
    (numberPart1 == null ? "" : numberPart1) +
    (numberPart2 == null ? "" : numberPart2);
  let heightNumber = Number(wholeNumber);
  if (isNaN(heightNumber) || heightUnit == null)
    throw new Error(`nodeHeight ${options.nodeHeight} is not valid.`);
  return Object.assign({}, options, {
    nodeHeight: heightNumber,
    nodeHeightUnit: heightUnit
  });
}

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
    this.state = {};
    this.state.options = transformOptions(
      Object.assign({}, defaultOptions, props.options)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.state.options = transformOptions(
        Object.assign({}, defaultOptions, nextProps.options)
      );
    }
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
        options={this.state.options}
        onClick={this.onClick}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        levelPadding="0"
      />
    );
  }
}

ImmutableTree.propTypes = {
  options: PropTypes.any,
  data: PropTypes.oneOfType([ImmutablePropTypes.map, ImmutablePropTypes.list])
    .isRequired,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func
};

ImmutableTree.defaultProps = { options: {} };
