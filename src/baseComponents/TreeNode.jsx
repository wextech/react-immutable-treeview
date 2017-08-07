import React from "react";
import PropTypes from "prop-types";
import ExpandButton from "./ExpandButton";
import Checkbox from "./Checkbox";

export default class TreeNode extends React.Component {
  renderHeader() {
    const props = this.props;
    let expandButtonDisplay =
      props.expandButtonDisplay == null
        ? props.children == null ? false : true
        : props.expandButtonDisplay;
    return (
      <div
        style={{
          display: "flex",
          height: props.options.nodeHeight
        }}
      >
        {expandButtonDisplay
          ? <ExpandButton
              style={{
                height: props.options.nodeHeight + props.options.nodeHeightUnit,
                width: props.options.expandButtonWidth,
                minWidth: props.options.expandButtonWidth
              }}
              expanded={props.expanded}
              onClick={props.onExpand}
            />
          : null}
        <div
          style={{
            marginLeft: expandButtonDisplay
              ? null
              : props.options.expandButtonWidth,
            display: "flex",
            width: "100%"
          }}
        >
          {props.checkboxDisplay
            ? <Checkbox
                style={{
                  width: props.options.checkboxWidth,
                  height: props.options.nodeHeight,
                  minWidth: props.options.checkboxWidth
                }}
                disabled={props.checkboxDisabled}
                checked={props.checked}
                onChange={props.onCheck}
              />
            : null}
          <span
            style={{
              lineHeight:
                props.options.nodeHeight + props.options.nodeHeightUnit,
              width: "100%",
              fontSize: props.options.fontSize + "px",
              backgroundColor: props.activated
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              cursor: "default",
              padding: "0 8px",
              overflow: "hidden",
              userSelect: "none",
              textOverflow: "ellipsis"
            }}
            onClick={e => props.onClick(e, true)}
          >
            {props.title}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <li
        style={Object.assign(
          {
            listStyle: "none"
          },
          this.props.style
        )}
      >
        {this.renderHeader()}
        {this.props.children}
      </li>
    );
  }
}

TreeNode.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.string,
  checkboxDisplay: PropTypes.bool,
  expandButtonDisplay: PropTypes.bool,
  expanded: PropTypes.bool,
  activated: PropTypes.bool,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  children: PropTypes.any,
  checkboxDisabled: PropTypes.bool,
  options: PropTypes.object.isRequired,
  style: PropTypes.object
};

TreeNode.defaultProps = {
  title: "",
  style: {},
  checked: "unchecked",
  checkboxDisplay: false,
  expandButtonDisplay: true,
  expanded: false,
  activated: false,
  options: {},
  onClick: () => {},
  onExpand: () => {},
  onCheck: () => {}
};
