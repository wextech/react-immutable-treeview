import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import { VelocityTransitionGroup } from "velocity-react";
export default class TreeContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <VelocityTransitionGroup
        component="ul"
        style={{
          listStyle: "none",
          margin: 0,
          paddingLeft: props.paddingLeft
        }}
        enter={{
          animation: "slideDown",
          duration: styles.animationDuration
        }}
        leave={{
          animation: "slideUp",
          duration: styles.animationDuration
        }}
      >
        {props.expanded ? props.children : null}
      </VelocityTransitionGroup>
    );
  }
}

TreeContainer.propTypes = {
  style: PropTypes.any,
  expanded: PropTypes.bool,
  children: PropTypes.any,
  paddingLeft: PropTypes.string
};

TreeContainer.defaultProps = {
  paddingLeft: styles.levelPadding,
  expanded: false
};
