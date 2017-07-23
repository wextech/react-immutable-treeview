import React from "react";
import { VelocityComponent } from "velocity-react";
import PropTypes from "prop-types";

export default class ExpandButton extends React.Component {
  render() {
    const props = this.props;
    let svgHeight = 16,
      svgWidth = 16;
    let points = `0,0 0,${svgHeight},${svgWidth},${svgHeight / 2}`;
    let width = props.width + "px",
      height = props.height + "px";
    return (
      <VelocityComponent
        duration={props.duration}
        animation={{ rotateZ: props.expanded ? 90 : 0 }}
      >
        <div
          style={{
            minWidth: width,
            minHeight: height,
            width: width,
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer"
          }}
          onClick={e => {
            e.stopPropagation();
            props.onClick(e, !props.expanded);
          }}
        >
          <svg height={svgHeight} width={svgWidth}>
            <polygon
              points={points}
              style={{ fill: "rgba(0, 0, 0, 0.870588)" }}
            />
          </svg>
        </div>
      </VelocityComponent>
    );
  }
}

ExpandButton.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired
};
