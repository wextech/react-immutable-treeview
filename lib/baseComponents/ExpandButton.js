"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _velocityReact = require("velocity-react");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpandButton = function (_React$Component) {
  _inherits(ExpandButton, _React$Component);

  function ExpandButton() {
    _classCallCheck(this, ExpandButton);

    return _possibleConstructorReturn(this, (ExpandButton.__proto__ || Object.getPrototypeOf(ExpandButton)).apply(this, arguments));
  }

  _createClass(ExpandButton, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var width = props.width + "px",
          height = props.height + "px";
      return _react2.default.createElement(
        "div",
        {
          style: {
            minWidth: width,
            minHeight: height,
            width: width,
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer"
          },
          onClick: function onClick(e) {
            e.stopPropagation();
            props.onClick(e, !props.expanded);
          }
        },
        _react2.default.createElement(
          _velocityReact.VelocityComponent,
          {
            duration: props.duration,
            animation: { rotateZ: props.expanded ? 90 : 0 }
          },
          _react2.default.createElement(
            "svg",
            {
              height: height,
              width: width,
              viewBox: "0, 0, " + props.width + ", " + props.height
            },
            _react2.default.createElement("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" })
          )
        )
      );
    }
  }]);

  return ExpandButton;
}(_react2.default.Component);

exports.default = ExpandButton;


ExpandButton.propTypes = {
  height: _propTypes2.default.number.isRequired,
  width: _propTypes2.default.number.isRequired,
  expanded: _propTypes2.default.bool.isRequired,
  duration: _propTypes2.default.number.isRequired
};