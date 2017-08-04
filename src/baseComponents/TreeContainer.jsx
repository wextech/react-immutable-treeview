import React from "react";
import PropTypes from "prop-types";
import { VelocityTransitionGroup, VelocityComponent } from "velocity-react";
import "velocity-animate/velocity.ui";

export default class TreeContainer extends React.Component {
  componentWillMount() {
    this.state = {
      version: 0,
      isChildrenExsited: this.props.expanded ? true : false
    };
  }

  prepareClearChildrenCallBack = (
    version,
    isChildrenExsited,
    animationDuration
  ) => {
    setTimeout(() => {
      if (this.state.version < version)
        this.setState({ isChildrenExsited, version });
    }, animationDuration);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.expanded == true && nextProps.expanded != true) {
      this.prepareClearChildrenCallBack(
        this.state.version + 1,
        false,
        nextProps.options.animationDuration
      );
    }
    if (this.props.expanded != true && nextProps.expanded == true) {
      this.setState({
        isChildrenExsited: true,
        version: this.state.version + 1
      });
    }
  }

  render() {
    const props = this.props;
    return (
      <VelocityComponent
        duration={props.options.animationDuration}
        animation={{
          height: props.expanded
            ? props.options.nodeHeight * 5 + props.options.nodeHeightUnit
            : 0 + props.options.nodeHeightUnit
        }}
      >
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            paddingLeft: props.levelPadding,
            overflow: "hidden"
          }}
        >
          {this.state.isChildrenExsited ? this.props.children : null}
        </ul>
      </VelocityComponent>
    );
  }
}

TreeContainer.propTypes = {
  expanded: PropTypes.bool,
  children: PropTypes.any,
  levelPadding: PropTypes.string,
  options: PropTypes.any.isRequired
};
