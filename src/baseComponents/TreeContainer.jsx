import React from "react";
import { TransitionMotion, spring } from "react-motion";
import PropTypes from "prop-types";

export default class TreeContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <TransitionMotion
        styles={previousInterpolatedStyles => {
          if (previousInterpolatedStyles == null)
            return props.expanded
              ? [
                  {
                    key: "expanded",
                    style: { height: props.contanierHeight }
                  }
                ]
              : [
                  {
                    key: "collapsed",
                    style: { height: 0 }
                  }
                ];
          let expandStyle = previousInterpolatedStyles.find(
            style => style.key === "expanded"
          );
          if (expandStyle) {
            return props.expanded
              ? expandStyle.style.height === props.contanierHeight
                ? [
                    {
                      key: "expanded",
                      style: {}
                    }
                  ]
                : [
                    {
                      key: "expanded",
                      style: { height: spring(props.contanierHeight) }
                    }
                  ]
              : expandStyle.style.height === 0
                ? [
                    {
                      key: "collapsed",
                      style: { height: 0 }
                    }
                  ]
                : [
                    {
                      key: "expanded",
                      style: { height: spring(0) }
                    }
                  ];
          } else {
            return props.expanded
              ? [
                  {
                    key: "expanded",
                    style: { height: spring(props.contanierHeight) }
                  }
                ]
              : [
                  {
                    key: "collapsed",
                    style: { height: 0 }
                  }
                ];
          }
        }}
      >
        {interpolatedStyles => {
          return (
            <ul
              className={interpolatedStyles[0].key}
              style={{
                height: interpolatedStyles[0].style.height
                  ? interpolatedStyles[0].style.height +
                    props.options.nodeHeightUnit
                  : null,
                listStyle: "none",
                margin: 0,
                paddingLeft: props.levelPadding,
                overflow: "hidden"
              }}
            >
              {interpolatedStyles[0].key === "expanded" ? props.children : null}
            </ul>
          );
        }}
      </TransitionMotion>
    );
  }
}

TreeContainer.propTypes = {
  expanded: PropTypes.bool,
  children: PropTypes.any,
  contanierHeight: PropTypes.number.isRequired,
  levelPadding: PropTypes.string,
  options: PropTypes.any.isRequired
};
