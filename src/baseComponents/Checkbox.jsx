import React, { Component } from "react";
import { VelocityComponent } from "velocity-react";
import PropTypes from "prop-types";

function uncheckedIcon(props) {
  return (
    <svg
      fill={props.disabled ? props.disabledColor : props.uncheckedColor}
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

export default class Checkbox extends Component {
  onChange = e => {
    e.stopPropagation();
    let { props } = this;
    if (props.checked === "checked") {
      this.props.onChange(e, "unchecked");
    } else {
      this.props.onChange(e, "checked");
    }
  };

  onClick = e => {
    e.stopPropagation();
    let { props } = this;
    this.props.onClick(e);
  };

  rendIcon = checked => {
    let { props } = this;
    switch (checked) {
      case "checked":
        return (
          <svg
            fill={props.disabled ? props.disabledColor : props.checkedColor}
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );

      case "unchecked":
        return uncheckedIcon(props);
      case "indeterminate":
        return (
          <svg
            fill={
              props.disabled ? props.disabledColor : props.indeterminateColor
            }
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <defs>
              <path d="M0 0h24v24H0z" id="a" />
            </defs>
            <clipPath id="b">
              <use overflow="visible" />
            </clipPath>
            <path
              clipPath="url(#b)"
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
            />{" "}
          </svg>
        );
      default:
        return uncheckedIcon(props);
    }
  };

  render() {
    let { props } = this;
    return (
      <div
        style={{
          width: props.width,
          height: props.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <input
          type="checkbox"
          onClick={this.onClick}
          onChange={this.onChange}
          name={props.name}
          disabled={props.disabled}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          readOnly={props.readOnly}
          tabIndex={props.tabIndex}
          checked={props.checked === "checked" ? true : false}
          style={{
            position: "absolute",
            margin: "0",
            cursor: "pointer",
            width: "24px",
            height: "24px",
            opacity: "0"
          }}
        />
        {this.rendIcon(props.checked)}
      </div>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  tabIndex: PropTypes.string,
  readOnly: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  checkedColor: PropTypes.string,
  uncheckedColor: PropTypes.string,
  indeterminateColor: PropTypes.string,
  disabledColor: PropTypes.string
};

Checkbox.defaultProps = {
  checked: "unchecked",
  onClick: () => {},
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  height: "32px",
  width: "32px",
  checkedColor: "rgb(0, 188, 212)",
  uncheckedColor: "rgba(0, 0, 0, 0.870588)",
  indeterminateColor: "rgb(0, 188, 212)",
  disabledColor: "rgba(0, 0, 0, 0.298039)"
};
