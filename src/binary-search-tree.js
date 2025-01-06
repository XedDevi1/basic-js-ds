const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let currentNode = this._root;

    while (true) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let currentNode = this._root;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      }
      currentNode = data < currentNode.data ? currentNode.left : currentNode.right;
    }

    return null;
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {

      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minRight = this.findMin(node.right);
      node.data = minRight.data;

      node.right = this.removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (!this._root) return null;
    let currentNode = this._root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (!this._root) return null;
    let currentNode = this._root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};