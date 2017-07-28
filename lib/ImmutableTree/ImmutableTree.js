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

var _BaseImmutableTree = require("./BaseImmutableTree");

var _BaseImmutableTree2 = _interopRequireDefault(_BaseImmutableTree);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImmutableTree = function (_React$Component) {
  _inherits(ImmutableTree, _React$Component);

  _createClass(ImmutableTree, [{
    key: "eventFunctionFactory",
    value: function eventFunctionFactory(onEventType) {
      return function (e, subNodePath, flag) {
        if (this.props[onEventType] == null) return;
        if (_immutable2.default.Iterable.isIndexed(this.props.data)) {
          this.props[onEventType](e, subNodePath, flag, this.props.data.get(subNodePath));
        } else {
          var nodePath = subNodePath;
          nodePath = subNodePath.slice(2);
          if (nodePath.length !== 0) {
            nodePath = ["children"].concat(nodePath);
          }
          this.props[onEventType](e, nodePath, flag, this.props.data.get(subNodePath));
        }
      };
    }
  }]);

  function ImmutableTree(props) {
    _classCallCheck(this, ImmutableTree);

    var _this = _possibleConstructorReturn(this, (ImmutableTree.__proto__ || Object.getPrototypeOf(ImmutableTree)).call(this, props));

    _this.onClick = _this.eventFunctionFactory("onClick").bind(_this);
    _this.onExpand = _this.eventFunctionFactory("onExpand").bind(_this);
    _this.onCheck = _this.eventFunctionFactory("onCheck").bind(_this);
    return _this;
  }

  _createClass(ImmutableTree, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var data = props.data,
          options = props.options,
          keyField = props.keyField,
          lastNode = props.lastNode;

      if (!_immutable2.default.Iterable.isIndexed(data)) {
        data = _immutable2.default.List.of(data);
      }
      return _react2.default.createElement(_BaseImmutableTree2.default, {
        data: data,
        expanded: true,
        options: options,
        onClick: this.onClick,
        onExpand: this.onExpand,
        onCheck: this.onCheck,
        paddingLeft: 0
      });
    }
  }]);

  return ImmutableTree;
}(_react2.default.Component);

exports.default = ImmutableTree;


ImmutableTree.propTypes = {
  options: _propTypes2.default.any,
  data: _propTypes2.default.any.isRequired,
  onClick: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onCheck: _propTypes2.default.func
};

ImmutableTree.defaultProps = { options: {} };