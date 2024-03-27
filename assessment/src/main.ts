import './style.css'

interface NodeWithChildren extends Node{
  children: Node[];
}

class Node {
  children: Node[] = [];
  constructor(public id: string, public type: string, public title: string) {
    this.id = id;
    this.type = type;
    this.title = title
  }
}

class Tree {
  obj: Node | any = {};
  constructor() {
  }

  createRootNode(id: string, type: string) {
    const rootNode = new Node(id, type);
    this.obj = rootNode;
  }

  // add node functionality
  createNode(id: string, type: string, parent: Node | {children: Array<Node>}) {
    const childNode = new Node(id, type);
    // assign this child node to given parent
    if (!parent.children) parent.children = [];
    parent.children.push(childNode);
  }

  // remove node functionality
  removeNode(parentNode: NodeWithChildren, index: number) {
    if (parentNode && Array.isArray(parentNode.children) && parentNode.children.length > index) {
      // remove the child from the parent node
      parentNode.children.splice(index, 1);
    }
  }

  // Move compoent
  moveComponent(sourceNode: NodeWithChildren, destinationNode: NodeWithChildren, sourceIndex: number, destinationIndex: number) {
    if (sourceNode && Array.isArray(sourceNode.children) && sourceNode.children.length > sourceIndex) {
      const movedNode = sourceNode.children.splice(sourceIndex, 1); // removing that node from source parent
      if (destinationNode && Array.isArray(destinationNode.children)) {
        if (destinationNode.children.length > destinationIndex) {
          destinationNode.children.splice(destinationIndex, 0, movedNode[0]); // add that node inside destination parent
        } else {
          destinationNode.children.push(movedNode[0])
        }
      }
    }
  }

  // remove node by Id
  removeNodeById(id: string) {
    if (!id) return;
    let isElementFound: boolean = false;
    const traverse = (currNode: Node) => {
      if (!currNode || !currNode.children || !currNode.children.length || isElementFound) return;
      // check the id inside the currNode
      const index = currNode.children.findIndex((child) => child.id === id);
      // if it's present then remove it.
      if (index >= 0) {
        currNode.children.splice(index, 1);
        isElementFound = true;
        return;
      }
      // iterate over each element and call travese method
      for(let i=0; i<currNode.children.length; i++) {
        traverse(currNode.children[i]);
      }
    }

    traverse(this.obj);
  }
}

const tree = new Tree();
tree.createRootNode('1', 'div');
tree.createNode('2', 'div', (tree.obj as Node));
tree.createNode('3', 'button', (tree.obj.children[0] as Node));
tree.createNode('4', 'input', (tree.obj.children[0] as Node));
tree.removeNodeById('3');
// console.log(tree);
// tree.removeNode((tree.obj.children[0] as Node), 1)
console.log(tree);

function renderTree (tree: Tree, parentEle: Element) {
  debugger
  // get the container element
  const renderNode = (currNode: Node, ele: Element) => {
    const currElement = document.createElement(currNode.type);
    currElement.setAttribute('id', currNode.id);
    currElement.innerText = 'currNode.title';
    ele.append(currElement);
    if (currNode.children) {
      currNode.children.forEach((childDetails) => {
        renderNode(childDetails, currElement);
      })
    }
  }

  renderNode((tree.obj as Node), parentEle);
}
const appEle = document.getElementById('app');
renderTree(tree, (appEle as HTMLElement));
