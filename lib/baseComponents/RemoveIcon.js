"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemoveIcon = function (_React$Component) {
  _inherits(RemoveIcon, _React$Component);

  function RemoveIcon() {
    _classCallCheck(this, RemoveIcon);

    return _possibleConstructorReturn(this, (RemoveIcon.__proto__ || Object.getPrototypeOf(RemoveIcon)).apply(this, arguments));
  }

  _createClass(RemoveIcon, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return _react2.default.createElement(
        "div",
        {
          style: {
            minWidth: 16,
            minHeight: 16,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer"
          },
          onClick: function onClick(e) {
            e.stopPropagation();
            props.onClick(e, _this2.props.lastNode);
          }
        },
        _react2.default.createElement(
          "svg",
          { height: 24, width: 24, fill: props.lastNode ? 'green' : 'darkgray' },
          _react2.default.createElement("path", { d: "M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        )
      );
    }
  }]);

  return RemoveIcon;
}(_react2.default.Component);

exports.default = RemoveIcon;