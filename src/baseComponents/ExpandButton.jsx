import React from "react";
import { VelocityComponent } from "velocity-react";
import PropTypes from "prop-types";

export default class ExpandButton extends React.Component {
  render() {
    const props = this.props;
    let width = props.width + "px",
      height = props.height + "px";
    return (
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
        <VelocityComponent
          duration={props.duration}
          animation={{ rotateZ: props.expanded ? 90 : 0 }}
        >
          <svg height={height} width={width}>
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
          </svg>
        </VelocityComponent>
      </div>
    );
  }
}

ExpandButton.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired
};
