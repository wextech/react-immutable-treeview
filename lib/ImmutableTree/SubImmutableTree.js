"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TreeContainer = require("../baseComponents/TreeContainer");

var _TreeContainer2 = _interopRequireDefault(_TreeContainer);

var _TreeNode = require("../baseComponents/TreeNode");

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _BaseImmutableTree = require("./BaseImmutableTree");

var _BaseImmutableTree2 = _interopRequireDefault(_BaseImmutableTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubImmutableTree = function (_React$Component) {
  _inherits(SubImmutableTree, _React$Component);

  _createClass(SubImmutableTree, [{
    key: "eventFunctionFactory",
    value: function eventFunctionFactory(onEventType) {
      return function (e, subNodePath, flag) {
        if (this.props[onEventType] == null) return;
        var nodePath = [this.props.location];
        if (subNodePath.length !== 0) nodePath = nodePath.concat("children").concat(subNodePath);
        this.props[onEventType](e, nodePath, flag);
      };
    }
  }]);

  function SubImmutableTree(props) {
    _classCallCheck(this, SubImmutableTree);

    var _this = _possibleConstructorReturn(this, (SubImmutableTree.__proto__ || Object.getPrototypeOf(SubImmutableTree)).call(this, props));

    _this.onClick = _this.eventFunctionFactory("onClick").bind(_this);
    _this.onExpand = _this.eventFunctionFactory("onExpand").bind(_this);
    _this.onCheck = _this.eventFunctionFactory("onCheck").bind(_this);
    return _this;
  }

  _createClass(SubImmutableTree, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          options = _props.options,
          data = _props.data,
          location = _props.location,
          paddingLeft = _props.paddingLeft,
          expanded = _props.expanded;

      return _react2.default.createElement(_BaseImmutableTree2.default, {
        paddingLeft: paddingLeft,
        data: data,
        expanded: expanded,
        options: options,
        onClick: this.onClick,
        onExpand: this.onExpand,
        onCheck: this.onCheck
      });
    }
  }]);

  return SubImmutableTree;
}(_react2.default.Component);

exports.default = SubImmutableTree;


SubImmutableTree.propTypes = {
  options: _propTypes2.default.any.isRequired,
  data: _propTypes2.default.any.isRequired,
  location: _propTypes2.default.number.isRequired,
  paddingLeft: _propTypes2.default.string,
  expanded: _propTypes2.default.bool
};

SubImmutableTree.defaultProps = {};