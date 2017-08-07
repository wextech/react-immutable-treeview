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
      height: 0,
      opacity: 0
    };
  }

  willLeave(nodeHeight) {
    return {
      height: spring(nodeHeight),
      opacity: spring(0)
    };
  }

  render() {
    const props = this.props;
    return (
      <TransitionMotion
        styles={props.data
          .map((nodeData, index) => ({
            key: nodeData.get("id") || index + "",
            style: { height: spring(props.options.nodeHeight), opacity: 1 }
          }))
          .toJS()}
        willEnter={() => this.willEnter(nodeHeight)}
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
              {props.data.map((nodeData, index) =>
                <TreeNode
                  key={nodeData.get("id") || index}
                  style={{
                    height:
                      interpolatedStyles[index].style.height +
                      props.options.nodeHeightUnit,
                    opacity: interpolatedStyles[index].style.opacity
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
                    props.onExpand(e, [index], !nodeData.get("expanded"))}
                  activated={nodeData.get("activated") || undefined}
                  onClick={e =>
                    props.onClick(e, [index], !nodeData.get("activated"))}
                  checkboxDisplay={
                    nodeData.get("checkboxDisplay") ||
                    props.options.checkboxDisplay
                  }
                  options={props.options}
                  checkboxDisabled={nodeData.get("checkboxDisabled")}
                  checked={nodeData.get("checked") || undefined}
                  onCheck={(e, checked) => props.onCheck(e, [index], checked)}
                >
                  {nodeData.get("children")
                    ? <SubImmutableTree
                        keyField={props.keyField}
                        expanded={nodeData.get("expanded") || undefined}
                        data={nodeData.get("children")}
                        location={index}
                        options={props.options}
                        onCheck={props.onCheck}
                        onClick={props.onClick}
                        onExpand={props.onExpand}
                      />
                    : null}
                </TreeNode>
              )}
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
