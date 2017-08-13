import React from "react";
import { StaggeredMotion, spring } from "react-motion";
import PropTypes from "prop-types";

export default class LoadingIcon extends React.Component {
  render() {
    let props = this.props;
    return (
      <div
        style={{
          height: props.options.nodeHeight + props.options.nodeHeightUnit
        }}
      >
        <StaggeredMotion
          defaultStyles={[
            { r: 2, grow: 1 },
            { r: 2, grow: 1 },
            { r: 2, grow: 1 }
          ]}
          styles={prevInterpolatedStyles => {
            return prevInterpolatedStyles.map((plaintStyle, i) => {
              if (i === 0) {
                if (
                  (plaintStyle.grow === 1 && plaintStyle.r !== 4) ||
                  (plaintStyle.grow === 0 && plaintStyle.r === 2)
                ) {
                  return {
                    r: spring(4),
                    grow: 1
                  };
                } else {
                  return { r: spring(2), grow: 0 };
                }
              } else {
                return {
                  r: spring(prevInterpolatedStyles[0].r),
                  grow: 1
                };
              }
            });
          }}
        >
          {interpolatedStyles =>
            <svg
              style={{
                height: props.options.nodeHeight + props.options.nodeHeightUnit,
                width: "72px"
              }}
              viewBox="0 0 72 24"
            >
              {interpolatedStyles.map((style, i) =>
                <circle
                  key={i}
                  cx={12 + i * 24}
                  cy="16"
                  r={style.r}
                  fill="#26C6DA"
                />
              )}
            </svg>}
        </StaggeredMotion>
      </div>
    );
  }
}

LoadingIcon.propTypes = {
  options: PropTypes.any.isRequired
};
