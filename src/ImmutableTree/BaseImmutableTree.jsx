import React from "react";
import PropTypes from "prop-types";
import { TransitionMotion, spring, presets } from "react-motion";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import SubImmutableTree from "./SubImmutableTree";
import Immutable from "immutable";

export default class BaseImmutableTree extends React.Component {
  willEnter() {
    return {
      isInserted: 1,
      height: 0,
      opacity: 0
    };
  }

  willLeave() {
    return {
      isDeleted: 1,
      height: spring(0),
      opacity: spring(0)
    };
  }

  didLeave = ({ data }) => {
    this.props.removeDict(data.nodeData);
  };

  componentWillReceiveProps(nexProps) {
    if (nexProps.data !== this.props.data) {
      let subtract = Immutable.Set.of(this.props.data).subtract(nexProps.data);
      nexProps.removeDict(this.props.data);
      subtract.forEach(nodeData => nexProps.removeDict(nodeData));
    }
  }

  componentWillUnmount() {
    this.props.removeDict(this.props.data);
    this.props.data.forEach(childData => this.props.removeDict(childData));
  }

  removeDictChildren = () => {
    this.props.removeDict(this.props.data);
    this.props.data.forEach(childData => this.props.removeDict(childData));
  };

  render() {
    const props = this.props;
    return (
      <TransitionMotion
        styles={props.data
          .filter(nodeData => nodeData)
          .map((nodeData, index) => ({
            key: nodeData.get("id") || String(index),
            style: {
              height: spring(
                props.heightCacheDict[nodeData] * props.options.nodeHeight
              ),
              opacity: 1,
              isDeleted: 0,
              isInserted: 0
            },
            data: index
          }))
          .toJS()
          .map(style =>
            Object.assign(style, {
              data: {
                nodeData: props.data.get(style.data),
                nodeIndex: style.data
              }
            })
          )}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        didLeave={this.didLeave}
      >
        {interpolatedStyles =>
          <TreeContainer
            levelPadding={props.levelPadding}
            contanierHeight={
              props.heightCacheDict[props.data] * props.options.nodeHeight
            }
            expanded={props.expanded}
            options={props.options}
            removeDict={this.removeDictChildren}
          >
            {() =>
              interpolatedStyles.map((interpolatedStyle, index) => {
                let { nodeData, nodeIndex } = interpolatedStyle.data;
                return (
                  <TreeNode
                    key={nodeData.get("id") || index}
                    style={{
                      height:
                        interpolatedStyle.style.height +
                        props.options.nodeHeightUnit,
                      opacity: interpolatedStyle.style.opacity,
                      overflow: "hidden"
                    }}
                    data={nodeData}
                    title={nodeData.get("title")}
                    expandButtonDisplay={
                      nodeData.get("expandButtonDisplay") ||
                      props.options.expandButtonDisplay ||
                      nodeData.get("children") != null
                    }
                    expanded={nodeData.get("expanded") || undefined}
                    onExpand={e =>
                      interpolatedStyle.style.isDeleted
                        ? null
                        : props.onExpand(
                            e,
                            [nodeIndex],
                            !nodeData.get("expanded")
                          )}
                    activated={nodeData.get("activated") || undefined}
                    onClick={e =>
                      interpolatedStyle.style.isDeleted
                        ? null
                        : props.onClick(
                            e,
                            [nodeIndex],
                            !nodeData.get("activated")
                          )}
                    checkboxDisplay={
                      nodeData.get("checkboxDisplay") ||
                      props.options.checkboxDisplay
                    }
                    options={props.options}
                    checkboxDisabled={nodeData.get("checkboxDisabled")}
                    checked={nodeData.get("checked") || undefined}
                    onCheck={(e, checked) =>
                      interpolatedStyle.style.isDeleted
                        ? null
                        : props.onCheck(e, [nodeIndex], checked)}
                  >
                    {nodeData.get("children")
                      ? <SubImmutableTree
                          removeDict={props.removeDict}
                          keyField={props.keyField}
                          expanded={nodeData.get("expanded") || undefined}
                          data={nodeData.get("children")}
                          location={
                            interpolatedStyle.style.isDeleted ? null : nodeIndex
                          }
                          heightCacheDict={props.heightCacheDict}
                          options={props.options}
                          onCheck={props.onCheck}
                          onClick={props.onClick}
                          onExpand={props.onExpand}
                        />
                      : null}
                  </TreeNode>
                );
              })}
          </TreeContainer>}
      </TransitionMotion>
    );
  }
}

BaseImmutableTree.propTypes = {
  options: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  removeDict: PropTypes.func.isRequired,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  levelPadding: PropTypes.string,
  expanded: PropTypes.bool,
  heightCacheDict: PropTypes.object.isRequired
};
