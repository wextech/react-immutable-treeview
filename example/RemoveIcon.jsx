import React from "react";
import PropTypes from "prop-types";

export default class RemoveIcon extends React.Component {
  render() {
    const props = this.props;
    return (
      <div
        style={{
          minWidth: 16,
          minHeight: 16,
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          cursor: "pointer"
        }}
        onClick={e => {
          e.stopPropagation();
          props.onClick(e, this.props.lastNode);
        }}
      >
        <svg height={24} width={24} fill={props.lastNode ? 'red' : 'darkgray'}>
          <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
        </svg>
      </div>
    );
  }
}