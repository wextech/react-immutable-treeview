import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import { VelocityTransitionGroup } from "velocity-react";
require("velocity-animate/velocity.ui");

export default class TreeContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <VelocityTransitionGroup
        enter={{
          animation: "slideDown",
          duration: props.animationDuration,
          stagger: props.animationDuration
        }}
        runOnMount={true}
        leave={{
          animation: "slideUp",
          duration: props.animationDuration,
          stagger: props.animationDuration,
          backwards: true
        }}
      >
        {props.expanded
          ? <VelocityTransitionGroup
            component="ul"
            style={{
              listStyle: "none",
              margin: 0,
              paddingLeft: props.paddingLeft
            }}
            enter={{
              animation: "transition.slideLeftIn",
              duration: props.animationDuration,
              stagger: props.animationDuration
            }}
            leave={{
              animation: "transition.slideRightOut",
              duration: props.animationDuration,
              stagger: props.animationDuration,
              backwards: true
            }}
          >
            {props.children}
          </VelocityTransitionGroup>
          : null}
      </VelocityTransitionGroup>
    );
  }
}

TreeContainer.propTypes = {
  style: PropTypes.any,
  expanded: PropTypes.bool,
  children: PropTypes.any,
  animationDuration: PropTypes.number,
  paddingLeft: PropTypes.string
};

TreeContainer.defaultProps = {
  paddingLeft: styles.levelPadding,
  expanded: false,
  animationDuration: styles.animationDuration
};
