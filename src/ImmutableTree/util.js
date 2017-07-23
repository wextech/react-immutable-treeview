import Immutable from "immutable";

export function priorityGet(evidenceArray) {
  for (let i = 0; i < evidenceArray.length; i++) {
    if (evidenceArray[i] != null) return evidenceArray[i];
  }
  return undefined;
}

export function findNodePathById(immutableTreeData, id) {
  if (id == null) return null;
  if (Immutable.Iterable.isIndexed(immutableTreeData)) {
    for (let i = 0; i < immutableTreeData.count(); i++) {
      if (immutableTreeData.getIn([i, "id"]) === id) {
        return [i];
      }
      let childPath = findNodePathById(immutableTreeData.get(i), id);
      if (childPath != null) return [i].concat(childPath);
    }
  } else {
    if (immutableTreeData.get("id") === id) {
      return [];
    } else {
      let children = immutableTreeData.get("children");
      if (children != null) {
        let childPath = findNodePathById(children, id);
        if (childPath != null) return ["children"].concat(childPath);
      }
    }
  }
}

export function expandOnPathNodes(immutableTreeData, nodePath) {
  if (nodePath.length === 0) {
    return immutableTreeData.set("expanded", true);
  }
  if (nodePath.length === 1) {
    return immutableTreeData.setIn([nodePath[0], "expanded"], true);
  }
  if (Immutable.Iterable.isIndexed(immutableTreeData)) {
    return expandOnPathNodes(
      immutableTreeData.setIn(nodePath.concat("expanded"), true),
      nodePath.slice(0, nodePath.length - 2)
    );
  } else {
    return expandOnPathNodes(
      immutableTreeData.setIn(nodePath.concat("expanded"), true),
      nodePath.slice(0, nodePath.length - 2, true)
    );
  }
}

export function getOnPathNodes(immutableTreeData, nodePath) {
  if (nodePath.length === 0) {
    return [];
  }
  if (Immutable.Iterable.isIndexed(immutableTreeData)) {
    return getOnPathNodes(
      immutableTreeData.get(nodePath[0]),
      nodePath.slice(1)
    );
  } else {
    return immutableTreeData.concat(
      getOnPathNodes(immutableTreeData.get(nodePath[0]), nodePath.slice(1))
    );
  }
}
