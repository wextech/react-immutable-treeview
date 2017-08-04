import React from "react";
import { VelocityComponent } from "velocity-react";
import PropTypes from "prop-types";

export default class ExpandButton extends React.Component {
  render() {
    const props = this.props;
    return (
      <div
        style={Object.assign(
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer",
            height: "32px",
            width: "32px"
          },
          props.style
        )}
        onClick={e => {
          e.stopPropagation();
          props.onClick(e, !props.expanded);
        }}
      >
        <VelocityComponent
          animationDuration={props.animationDuration}
          animation={{ rotateZ: props.expanded ? 90 : 0 }}
        >
          <svg height="24px" width="24px" viewBox="0, 0, 24, 24">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
          </svg>
        </VelocityComponent>
      </div>
    );
  }
}

ExpandButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  style: PropTypes.object
};
