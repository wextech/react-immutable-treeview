import React from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";

const expandSVGIcon = rotate =>
  <svg
    style={{ transform: `rotate(${rotate}deg)` }}
    height="24px"
    width="24px"
    viewBox="0, 0, 24, 24"
  >
    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
  </svg>;

export default class ExpandButton extends React.Component {
  componentWillMount() {
    this.state = { firstRender: true };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.firstRender === true &&
      this.props.expanded !== nextProps.expanded
    ) {
      this.state.firstRender = false;
    }
  }

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
        {this.state.firstRender
          ? expandSVGIcon(props.expanded ? 90 : 0)
          : <Motion
              defaultStyle={{ rotate: props.expanded ? 0 : 90 }}
              style={{ rotate: props.expanded ? spring(90) : spring(0) }}
            >
              {interpolatedStyle => expandSVGIcon(interpolatedStyle.rotate)}
            </Motion>}
      </div>
    );
  }
}

ExpandButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  style: PropTypes.object
};
