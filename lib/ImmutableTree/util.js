"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.priorityGet = priorityGet;
exports.findNodePathById = findNodePathById;
exports.expandOnPathNodes = expandOnPathNodes;
exports.getOnPathNodes = getOnPathNodes;

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function priorityGet(evidenceArray) {
  for (var i = 0; i < evidenceArray.length; i++) {
    if (evidenceArray[i] != null) return evidenceArray[i];
  }
  return undefined;
}

function findNodePathById(immutableTreeData, id) {
  if (id == null) return null;
  if (_immutable2.default.Iterable.isIndexed(immutableTreeData)) {
    for (var i = 0; i < immutableTreeData.count(); i++) {
      if (immutableTreeData.getIn([i, "id"]) === id) {
        return [i];
      }
      var childPath = findNodePathById(immutableTreeData.get(i), id);
      if (childPath != null) return [i].concat(childPath);
    }
  } else {
    if (immutableTreeData.get("id") === id) {
      return [];
    } else {
      var children = immutableTreeData.get("children");
      if (children != null) {
        var _childPath = findNodePathById(children, id);
        if (_childPath != null) return ["children"].concat(_childPath);
      }
    }
  }
}

function expandOnPathNodes(immutableTreeData, nodePath) {
  if (nodePath.length === 0) {
    return immutableTreeData.set("expanded", true);
  }
  if (nodePath.length === 1) {
    return immutableTreeData.setIn([nodePath[0], "expanded"], true);
  }
  if (_immutable2.default.Iterable.isIndexed(immutableTreeData)) {
    return expandOnPathNodes(immutableTreeData.setIn(nodePath.concat("expanded"), true), nodePath.slice(0, nodePath.length - 2));
  } else {
    return expandOnPathNodes(immutableTreeData.setIn(nodePath.concat("expanded"), true), nodePath.slice(0, nodePath.length - 2, true));
  }
}

function getOnPathNodes(immutableTreeData, nodePath) {
  if (nodePath.length === 0) {
    return [];
  }
  if (_immutable2.default.Iterable.isIndexed(immutableTreeData)) {
    return getOnPathNodes(immutableTreeData.get(nodePath[0]), nodePath.slice(1));
  } else {
    return immutableTreeData.concat(getOnPathNodes(immutableTreeData.get(nodePath[0]), nodePath.slice(1)));
  }
}