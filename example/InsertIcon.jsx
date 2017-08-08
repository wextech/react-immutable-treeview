import React from "react";
import PropTypes from "prop-types";

export default class InsertIcon extends React.Component {
  onClick = e => {
    e.stopPropagation();
    this.props.onClick(e, this.props.lastNode);
  };
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
        onClick={this.onClick}
      >
        <svg
          height={24}
          width={24}
          fill={props.lastNode ? "green" : "darkgray"}
        >
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
    );
  }
}
