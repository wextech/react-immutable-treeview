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

var _SubImmutableTree = require("./SubImmutableTree");

var _SubImmutableTree2 = _interopRequireDefault(_SubImmutableTree);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseImmutableTree = function (_React$Component) {
  _inherits(BaseImmutableTree, _React$Component);

  function BaseImmutableTree() {
    _classCallCheck(this, BaseImmutableTree);

    return _possibleConstructorReturn(this, (BaseImmutableTree.__proto__ || Object.getPrototypeOf(BaseImmutableTree)).apply(this, arguments));
  }

  _createClass(BaseImmutableTree, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return _react2.default.createElement(
        _TreeContainer2.default,
        { paddingLeft: props.paddingLeft, expanded: props.expanded },
        props.data.map(function (nodeData, index) {
          return _react2.default.createElement(
            _TreeNode2.default,
            {
              key: nodeData.get("id") || index,
              data: nodeData,
              title: nodeData.get("title"),
              displayExpandButton: (0, _util.priorityGet)([nodeData.get("displayExpandButton"), props.options.displayExpandButton, nodeData.get("children") != null]),
              expanded: nodeData.get("expanded") || undefined,
              onExpand: function onExpand(e, expanded) {
                props.onExpand(e, [index], expanded);
              },
              activated: nodeData.get("activated") || undefined,
              onClick: function onClick(e) {
                return props.onClick(e, [index], !nodeData.get("activated"));
              },
              displayCheckBox: (0, _util.priorityGet)([nodeData.get("displayCheckBox"), props.options.displayCheckBox]),
              checked: nodeData.get("checked") || undefined,
              onCheck: function onCheck(e) {
                return props.onCheck(e, [index], !nodeData.get("checked"));
              }
            },
            nodeData.get("children") ? _react2.default.createElement(_SubImmutableTree2.default, {
              keyField: props.keyField,
              expanded: nodeData.get("expanded") || undefined,
              data: nodeData.get("children"),
              location: index,
              options: props.options,
              onCheck: props.onCheck,
              onClick: props.onClick,
              onExpand: props.onExpand
            }) : null
          );
        })
      );
    }
  }]);

  return BaseImmutableTree;
}(_react2.default.Component);

exports.default = BaseImmutableTree;


BaseImmutableTree.propTypes = {
  options: _propTypes2.default.any,
  data: _propTypes2.default.any.isRequired,
  onClick: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onCheck: _propTypes2.default.func,
  paddingLeft: _propTypes2.default.any,
  expanded: _propTypes2.default.bool
};

BaseImmutableTree.defaultProps = {};