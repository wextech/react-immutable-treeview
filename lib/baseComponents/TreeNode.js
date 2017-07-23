"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ExpandButton = require("./ExpandButton");

var _ExpandButton2 = _interopRequireDefault(_ExpandButton);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

var _Checkbox = require("material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode() {
    _classCallCheck(this, TreeNode);

    return _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).apply(this, arguments));
  }

  _createClass(TreeNode, [{
    key: "renderHeader",
    value: function renderHeader() {
      var props = this.props;
      var displayExpandButton = props.displayExpandButton == null ? props.children == null ? false : true : props.displayExpandButton;
      return _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            backgroundColor: props.activated ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"
          },
          onClick: function onClick(e) {
            return props.onClick(e, true);
          }
        },
        displayExpandButton ? _react2.default.createElement(_ExpandButton2.default, {
          height: _styles2.default.treeNodeHeight,
          width: _styles2.default.expandButtonWidth,
          duration: _styles2.default.animationDuration,
          expanded: props.expanded,
          onClick: props.onExpand
        }) : null,
        props.displayCheckBox ? _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_Checkbox2.default, {
            disabled: props.displayCheckbox,
            checked: props.checked
          })
        ) : null,
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "span",
            {
              style: {
                lineHeight: _styles2.default.treeNodeHeight + "px",
                fontSize: _styles2.default.fontSize + "px",
                whiteSpace: "nowrap",
                cursor: "default",
                padding: "0 8px"
              }
            },
            props.title
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "li",
        { style: { listStyle: "none" } },
        this.renderHeader(),
        this.props.children
      );
    }
  }]);

  return TreeNode;
}(_react2.default.Component);

exports.default = TreeNode;


TreeNode.propTypes = {
  title: _propTypes2.default.string,
  checked: _propTypes2.default.bool,
  displayCheckbox: _propTypes2.default.bool,
  displayExpandButton: _propTypes2.default.bool,
  expanded: _propTypes2.default.bool,
  activated: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onCheck: _propTypes2.default.func,
  children: _propTypes2.default.any
};

TreeNode.defaultProps = {
  title: "",
  checked: false,
  displayCheckbox: true,
  displayExpandButton: true,
  expanded: false,
  activated: false,
  onClick: function onClick() {},
  onExpand: function onExpand() {},
  onCheck: function onCheck() {}
};