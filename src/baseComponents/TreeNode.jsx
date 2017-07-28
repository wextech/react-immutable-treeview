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
          backgroundColor: props.activated
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0)",
          height: styles.height
        }}
        onClick={e => props.onClick(e, true)}
      >
        {expandButtonDisplay
          ? <ExpandButton
              duration={styles.animationDuration}
              expanded={props.expanded}
              onClick={props.onExpand}
            />
          : null}
        {props.checkboxDisplay
          ? <Checkbox
              disabled={props.checkboxDisabled}
              checked={props.checked}
              onChange={props.onCheck}
            />
          : null}
        <span
          style={{
            lineHeight: styles.height,
            fontSize: styles.fontSize + "px",
            whiteSpace: "nowrap",
            cursor: "default",
            padding: "0 8px"
          }}
        >
          {props.title}
        </span>
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
  expanded: PropTypes.bool,
  activated: PropTypes.bool,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  children: PropTypes.any,
  checkboxDisabled: PropTypes.bool
};

TreeNode.defaultProps = {
  title: "",
  checked: "unchecked",
  checkboxDisplay: false,
  expandButtonDisplay: true,
  expanded: false,
  activated: false,
  onClick: () => {},
  onExpand: () => {},
  onCheck: () => {}
};
