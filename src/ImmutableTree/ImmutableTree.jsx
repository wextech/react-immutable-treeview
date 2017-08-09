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

  calcTreeDisplayNodeCnt(treeData, heightCacheDict, finalLatch) {
    if (treeData == null) return 0;
    if (treeData.count() === 0) {
      heightCacheDict[treeData] = 0;
      return 0;
    }
    let cachedCnt = heightCacheDict[treeData];
    if (cachedCnt == null || finalLatch !== 0) {
      cachedCnt = treeData.reduce((displayNodeCnt, curNodeData) => {
        let childCnt = 0;
        if (curNodeData.get("expanded")) {
          childCnt = this.calcTreeDisplayNodeCnt(
            curNodeData.get("children"),
            heightCacheDict,
            finalLatch
          );
          if (finalLatch !== 0) {
            heightCacheDict[curNodeData] = childCnt + 1;
          }
          return displayNodeCnt + 1 + childCnt;
        } else {
          if (finalLatch === 0) {
            return displayNodeCnt + 1;
          }
          childCnt = this.calcTreeDisplayNodeCnt(
            curNodeData.get("children"),
            heightCacheDict,
            finalLatch == null ? 1 : finalLatch - 1
          );
          if (finalLatch !== 0) {
            heightCacheDict[curNodeData] = 1;
          }
          return displayNodeCnt + 1;
        }
      }, 0);
      if (finalLatch !== 0) {
        heightCacheDict[treeData] = cachedCnt;
      }
    }
    return cachedCnt;
  }

  buildHeightCacheDict(treeData, heightCacheDict) {
    let cachedCnt = this.calcTreeDisplayNodeCnt(treeData, heightCacheDict);
    heightCacheDict[treeData] = cachedCnt;
    return heightCacheDict;
  }

  constructor(props) {
    super(props);
    this.onClick = this.eventFunctionFactory("onClick").bind(this);
    this.onExpand = this.eventFunctionFactory("onExpand").bind(this);
    this.onCheck = this.eventFunctionFactory("onCheck").bind(this);
    this.state = { heightCacheDict: {} };
    if (!Immutable.Iterable.isIndexed(props.data)) {
      this.state.data = Immutable.List.of(props.data);
    } else {
      this.state.data = props.data;
    }
    this.state.options = transformOptions(
      Object.assign({}, defaultOptions, props.options)
    );
    this.buildHeightCacheDict(this.state.data, this.state.heightCacheDict);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.state.options = transformOptions(
        Object.assign({}, defaultOptions, nextProps.options)
      );
    }
    if (this.props.data !== nextProps.data) {
      if (!Immutable.Iterable.isIndexed(nextProps.data)) {
        this.state.data = Immutable.List.of(nextProps.data);
      } else {
        this.state.data = nextProps.data;
      }
      this.buildHeightCacheDict(this.state.data, this.state.heightCacheDict);
    }
  }

  removeDict = obj => {
    delete this.state.heightCacheDict[obj];
  };

  render() {
    const props = this.props;
    let { options, keyField } = props;
    return (
      <BaseImmutableTree
        removeDict={this.removeDict}
        data={this.state.data}
        expanded={true}
        options={this.state.options}
        onClick={this.onClick}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        levelPadding="0"
        heightCacheDict={this.state.heightCacheDict}
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
