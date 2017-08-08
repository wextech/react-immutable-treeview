import React from "react";
import PropTypes from "prop-types";
import { TransitionMotion, spring, presets } from "react-motion";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import SubImmutableTree from "./SubImmutableTree";

export default class BaseImmutableTree extends React.Component {
  calcTreeDisplayNodeCnt(treeData) {
    if (treeData == null || treeData.count() === 0) return 0;
    return treeData.reduce((displayNodeCnt, curNodeData) => {
      return (
        displayNodeCnt +
        1 +
        (curNodeData.get("expanded")
          ? this.calcTreeDisplayNodeCnt(curNodeData.get("children"))
          : 0)
      );
    }, 0);
  }

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

  render() {
    const props = this.props;
    return (
      <TransitionMotion
        styles={props.data
          .map((nodeData, index) => ({
            key: nodeData.get("id") || String(index),
            style: {
              height: spring(props.options.nodeHeight),
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
        willEnter={() => this.willEnter()}
        willLeave={this.willLeave}
      >
        {interpolatedStyles => {
          return (
            <TreeContainer
              levelPadding={props.levelPadding}
              contanierHeight={
                this.calcTreeDisplayNodeCnt(props.data) *
                props.options.nodeHeight
              }
              expanded={props.expanded}
              options={props.options}
            >
              {interpolatedStyles.map((interpolatedStyle, index) => {
                let { nodeData, nodeIndex } = interpolatedStyle.data;
                return (
                  <TreeNode
                    key={nodeData.get("id") || index}
                    style={{
                      height:
                        interpolatedStyle.style.height ===
                        props.options.nodeHeight
                          ? undefined
                          : interpolatedStyle.style.height +
                            props.options.nodeHeightUnit,
                      opacity: interpolatedStyle.style.opacity
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
                          keyField={props.keyField}
                          expanded={nodeData.get("expanded") || undefined}
                          data={nodeData.get("children")}
                          location={
                            interpolatedStyle.style.isDeleted ? null : nodeIndex
                          }
                          options={props.options}
                          onCheck={props.onCheck}
                          onClick={props.onClick}
                          onExpand={props.onExpand}
                        />
                      : null}
                  </TreeNode>
                );
              })}
            </TreeContainer>
          );
        }}
      </TransitionMotion>
    );
  }
}

BaseImmutableTree.propTypes = {
  options: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  levelPadding: PropTypes.string,
  expanded: PropTypes.bool
};
