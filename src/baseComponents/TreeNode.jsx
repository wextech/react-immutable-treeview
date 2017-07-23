import React from "react";
import PropTypes from "prop-types";
import ExpandButton from "./ExpandButton";
import styles from "./styles";
import Checkbox from "material-ui/Checkbox";

export default class TreeNode extends React.Component {
  renderHeader() {
    const props = this.props;
    let displayExpandButton =
      props.displayExpandButton == null
        ? props.children == null ? false : true
        : props.displayExpandButton;
    return (
      <div
        style={{
          display: "flex",
          backgroundColor: props.activated
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0)"
        }}
        onClick={e => props.onClick(e, true)}
      >
        {displayExpandButton
          ? <ExpandButton
              height={styles.treeNodeHeight}
              width={styles.expandButtonWidth}
              duration={styles.animationDuration}
              expanded={props.expanded}
              onClick={props.onExpand}
            />
          : null}
        {props.displayCheckBox
          ? <div>
              <Checkbox
                disabled={props.displayCheckbox}
                checked={props.checked}
              />
            </div>
          : null}
        <div>
          <span
            style={{
              lineHeight: styles.treeNodeHeight + "px",
              fontSize: styles.fontSize + "px",
              whiteSpace: "nowrap",
              cursor: "default",
              padding: "0 8px"
            }}
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
  checked: PropTypes.bool,
  displayCheckbox: PropTypes.bool,
  displayExpandButton: PropTypes.bool,
  expanded: PropTypes.bool,
  activated: PropTypes.bool,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  children: PropTypes.any
};

TreeNode.defaultProps = {
  title: "",
  checked: false,
  displayCheckbox: true,
  displayExpandButton: true,
  expanded: false,
  activated: false,
  onClick: () => {},
  onExpand: () => {},
  onCheck: () => {}
};
