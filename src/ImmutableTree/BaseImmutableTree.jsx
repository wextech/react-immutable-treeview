import React from "react";
import PropTypes from "prop-types";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import SubImmutableTree from "./SubImmutableTree";
import { priorityGet } from "./util";

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
            displayExpandButton={priorityGet([
              nodeData.get("displayExpandButton"),
              props.options.displayExpandButton,
              nodeData.get("children") != null
            ])}
            expanded={nodeData.get("expanded") || undefined}
            onExpand={(e, expanded) => {
              props.onExpand(e, [index], expanded)
            }
            }
            activated={nodeData.get("activated") || undefined}
            onClick={e => props.onClick(e, [index], !nodeData.get("activated"))}
            displayCheckBox={priorityGet([
              nodeData.get("displayCheckBox"),
              props.options.displayCheckBox
            ])}
            checked={nodeData.get("checked") || undefined}
            onCheck={e => props.onCheck(e, [index], !nodeData.get("checked"))}
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
  paddingLeft: PropTypes.any,
  expanded: PropTypes.bool
};

BaseImmutableTree.defaultProps = {};
