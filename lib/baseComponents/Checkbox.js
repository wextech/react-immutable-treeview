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

function uncheckedIcon(props) {
  return _react2.default.createElement(
    "svg",
    {
      fill: props.disabled ? props.disabledColor : props.uncheckedColor,
      height: "24",
      viewBox: "0 0 24 24",
      width: "24"
    },
    _react2.default.createElement("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }),
    _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
  );
}

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e) {
      e.stopPropagation();
      var _this2 = _this,
          props = _this2.props;

      if (props.checked === "checked") {
        _this.props.onChange(e, "unchecked");
      } else {
        _this.props.onChange(e, "checked");
      }
    }, _this.onClick = function (e) {
      e.stopPropagation();
      var _this3 = _this,
          props = _this3.props;

      _this.props.onClick(e);
    }, _this.rendIcon = function (checked) {
      var _this4 = _this,
          props = _this4.props;

      switch (checked) {
        case "checked":
          return _react2.default.createElement(
            "svg",
            {
              fill: props.disabled ? props.disabledColor : props.checkedColor,
              height: "24",
              viewBox: "0 0 24 24",
              width: "24",
              xmlns: "http://www.w3.org/2000/svg"
            },
            _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
            _react2.default.createElement("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
          );

        case "unchecked":
          return uncheckedIcon(props);
        case "indeterminate":
          return _react2.default.createElement(
            "svg",
            {
              fill: props.disabled ? props.disabledColor : props.indeterminateColor,
              height: "24",
              viewBox: "0 0 24 24",
              width: "24"
            },
            _react2.default.createElement(
              "defs",
              null,
              _react2.default.createElement("path", { d: "M0 0h24v24H0z", id: "a" })
            ),
            _react2.default.createElement(
              "clipPath",
              { id: "b" },
              _react2.default.createElement("use", { overflow: "visible" })
            ),
            _react2.default.createElement("path", {
              clipPath: "url(#b)",
              d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
            }),
            " "
          );
        default:
          return uncheckedIcon(props);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        "div",
        {
          style: {
            width: props.width,
            height: props.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
          }
        },
        _react2.default.createElement("input", {
          type: "checkbox",
          onClick: this.onClick,
          onChange: this.onChange,
          name: props.name,
          disabled: props.disabled,
          onBlur: props.onBlur,
          onFocus: props.onFocus,
          readOnly: props.readOnly,
          tabIndex: props.tabIndex,
          checked: props.checked === "checked" ? true : false,
          style: {
            position: "absolute",
            margin: "0",
            cursor: "pointer",
            width: "24px",
            height: "24px",
            opacity: "0"
          }
        }),
        this.rendIcon(props.checked)
      );
    }
  }]);

  return Checkbox;
}(_react.Component);

exports.default = Checkbox;


Checkbox.propTypes = {
  name: _propTypes2.default.string,
  type: _propTypes2.default.string,
  checked: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  tabIndex: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  height: _propTypes2.default.string,
  width: _propTypes2.default.string,
  checkedColor: _propTypes2.default.string,
  uncheckedColor: _propTypes2.default.string,
  indeterminateColor: _propTypes2.default.string,
  disabledColor: _propTypes2.default.string
};

Checkbox.defaultProps = {
  checked: "unchecked",
  onClick: function onClick() {},
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  height: "32px",
  width: "32px",
  checkedColor: "rgb(0, 188, 212)",
  uncheckedColor: "rgba(0, 0, 0, 0.870588)",
  indeterminateColor: "rgb(0, 188, 212)",
  disabledColor: "rgba(0, 0, 0, 0.298039)"
};