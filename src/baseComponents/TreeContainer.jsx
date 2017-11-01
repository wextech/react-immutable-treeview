import React from "react";
import { TransitionMotion, spring } from "react-motion";
import PropTypes from "prop-types";

export default class TreeContainer extends React.Component {
  render() {
    const props = this.props;
    const { isAnimation } = props.options;
    return (
      <TransitionMotion
        defaultStyles={[
          {
            key: "expanded",
            style: { height: props.contanierHeight }
          }
        ]}
        styles={previousInterpolatedStyles => {
          let expandStyle = previousInterpolatedStyles[0];
          if (props.contanierHeight === 0) {
            if (expandStyle.style.height == null) {
              return [
                {
                  key: "expanded",
                  style: {
                    height: isAnimation
                      ? spring(props.contanierHeight)
                      : props.contanierHeight
                  }
                }
              ];
            }
            return [
              {
                key: "expanded",
                style: { height: isAnimation ? spring(0) : 0 }
              }
            ];
          } else {
            if (expandStyle.style.height === props.contanierHeight) {
              return [
                {
                  key: "expanded",
                  style: {}
                }
              ];
            } else {
              return [
                {
                  key: "expanded",
                  style: {
                    height: isAnimation
                      ? spring(props.contanierHeight)
                      : props.contanierHeight
                  }
                }
              ];
            }
          }
        }}
      >
        {interpolatedStyles => {
          return (
            <ul
              className={interpolatedStyles[0].key}
              style={{
                height: interpolatedStyles[0].style.height
                  ? "auto"
                  : interpolatedStyles[0].style.height +
                    props.options.nodeHeightUnit,
                listStyle: "none",
                margin: 0,
                paddingLeft: props.levelPadding,
                overflow: "hidden"
              }}
            >
              {interpolatedStyles[0].style.height === 0
                ? null
                : props.children()}
            </ul>
          );
        }}
      </TransitionMotion>
    );
  }
}

TreeContainer.propTypes = {
  children: PropTypes.any,
  contanierHeight: PropTypes.number.isRequired,
  levelPadding: PropTypes.string,
  options: PropTypes.any.isRequired
};
