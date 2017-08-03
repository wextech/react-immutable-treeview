import React from "react";
import PropTypes from "prop-types";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import SubImmutableTree from "./SubImmutableTree";

export default class BaseImmutableTree extends React.Component {
  render() {
    const props = this.props;
    return (
      <TreeContainer paddingLeft={props.paddingLeft} expanded={props.expanded}>
        {props.data.map((nodeData, index) =>
          <TreeNode
            key={nodeData.get("id") || index}
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
            onClick={e => props.onClick(e, [index], !nodeData.get("activated"))}
            checkboxDisplay={
              nodeData.get("checkboxDisplay") || props.options.checkboxDisplay
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
  }
}

BaseImmutableTree.propTypes = {
  options: PropTypes.any,
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  paddingLeft: PropTypes.string,
  expanded: PropTypes.bool
};

BaseImmutableTree.defaultProps = {};
