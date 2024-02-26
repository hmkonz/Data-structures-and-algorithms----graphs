class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  //this function takes 'vertex' passed in and adds it to the this.nodes Set
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of vertices and adds each vertex, one at a time, to the this.nodes Set
  addVertices(vertexArray) {
    // for every vertex in vertexArray, call the addVertex method which adds that vertex to this.nodes.set
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and sets the relationship between the 2 vertices (updates their adjacent values to include the other vertex)
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // for every node in 'this.nodes' set, check to see if 'node.adjacent' includes 'vertex'. If so, remove it from that node's adjacency list
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    // then remove 'vertex' from 'this.nodes' set
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // create a stack with 'start' as its initial element
    const stack = [start];
    // initialize 'result' to an empty array
    const result = [];
    // create a new Set
    const visited = new Set();
    let currentVertex;

    // add node visited to 'visited' Set
    visited.add(start);

    // while stack is not an empty queue
    while (stack.length) {
      // // remove the last vertex in 'stack'' and set it equal to 'currentVertex'
      currentVertex = stack.pop();
      // add the value of 'currentVertex' to the 'result' array
      result.push(currentVertex.value);

      // visit neighbors and push onto stack
      currentVertex.adjacent.forEach((neighbor) => {
        // if 'neighbor' is not included in the 'visited' Set
        if (!visited.has(neighbor)) {
          // add 'neighbor' to 'visited' Set
          visited.add(neighbor);
          // add 'neighbor' to the end of 'stack'
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // create a queue with 'start' as its iniital element
    const queue = [start];
    // initialize 'result' to an empty array
    const result = [];
    // create a new Set
    const visited = new Set();
    let currentVertex;

    // add node visited to 'visited' Set
    visited.add(start);

    // While there are vertices in queue
    while (queue.length) {
      // remove the first vertex in queue and set it equal to 'currentVertex'
      currentVertex = queue.shift();
      // add the value of 'currentVertex' to the 'result' array
      result.push(currentVertex.value);

      // visit neighbors
      currentVertex.adjacent.forEach((neighbor) => {
        // if 'neighbor' is not included in the 'visited' Set
        if (!visited.has(neighbor)) {
          // add 'neighbor' to 'visited' Set
          visited.add(neighbor);
          // add 'neighbor' to the end of 'queue'
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

module.exports = { Graph, Node };

let graph = new Graph();
