import React from "react";
import PropTypes from "prop-types";
import ExpandButton from "./ExpandButton";
import styles from "./styles";
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
                height: props.options.nodeHeight,
                width: props.options.expandButtonWidth,
                minWidth: props.options.expandButtonWidth
              }}
              duration={props.options.animationDuration}
              expanded={props.expanded}
              onClick={props.onExpand}
            />
          : null}
        <div
          style={{
            marginLeft: expandButtonDisplay ? null : props.expandButtonWidth,
            display: "flex"
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
              lineHeight: props.options.nodeHeight,
              width: "100%",
              fontSize: props.options.fontSize + "px",
              backgroundColor: props.activated
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              cursor: "default",
              padding: "0 8px",
              overflow: "hidden",
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
      <li style={{ listStyle: "none" }}>
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
  expandButtonWidth: PropTypes.string,
  expanded: PropTypes.bool,
  activated: PropTypes.bool,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  children: PropTypes.any,
  checkboxDisabled: PropTypes.bool,
  options: PropTypes.object
};

TreeNode.defaultProps = {
  title: "",
  checked: "unchecked",
  checkboxDisplay: false,
  expandButtonDisplay: true,
  expandButtonWidth: styles.expandButtonWidth,
  expanded: false,
  activated: false,
  options: {},
  onClick: () => {},
  onExpand: () => {},
  onCheck: () => {}
};
