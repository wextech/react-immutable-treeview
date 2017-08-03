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
          duration: styles.animationDuration,
          stagger: styles.animationDuration
        }}
        runOnMount={true}
        leave={{
          animation: "slideUp",
          duration: styles.animationDuration,
          stagger: styles.animationDuration,
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
                duration: styles.animationDuration,
                stagger: styles.animationDuration
              }}
              leave={{
                animation: "transition.slideRightOut",
                duration: styles.animationDuration,
                stagger: styles.animationDuration,
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
  paddingLeft: PropTypes.string
};

TreeContainer.defaultProps = {
  paddingLeft: styles.levelPadding,
  expanded: false
};
