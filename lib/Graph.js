/**
 * Rules for Graph
 * 1) Does not support multiple of the same Node. Each Node should be unique.
 * 2) Does not support multiple of the same Edge. Each Edge should be unique. A unique Edge is a unique fromNode and
 * toNode pair.
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var GraphEdge = require('./GraphEdge');
var GraphNode = require('./GraphNode');
var Map = require('./Map');
var Obj = require('./Obj');
var Set = require('./Set');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Graph = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Set<GraphEdge>}
         */
        this.edgeSet = new Set();

        /**
         * @private
         * @type {Map<GraphNode, Set<GraphEdge>>}
         */
        this.fromNodeToEdgeSetMap = new Map();

        /**
         * @private
         * @type {Set<GraphNode>}
         */
        this.nodeSet = new Set();

        /**
         * @private
         * @type {Map<GraphNode, Set<GraphEdge>>}
         */
        this.toNodeToEdgeSetMap = new Map();

        /**
         * @private
         * @type {Map<*, GraphNode>}
         */
        this.valueToNodeMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        return output;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {*} fromValue
     * @param {*} toValue
     */
    addEdgeFromValueToValue: function(fromValue, toValue) {
        var fromNode = this.getNode(fromValue);
        var toNode = this.getNode(toValue);
        if (!fromNode) {
            throw new Error("GraphNode for the fromValue does not exist");
        }
        if (!toNode) {
            throw new Error("GraphNode for the toValue does not exist");
        }
        var edge = new GraphEdge(fromNode, toNode);
        this.addEdge(edge);
    },

    /**
     * @param {*} value
     */
    addNodeForValue: function(value) {
        var node = new GraphNode(value);
        this.addNode(node);
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {GraphEdge} edge
     */
    addEdge: function(edge) {
        if (!this.edgeSet.contains(edge)) {
            this.edgeSet.add(edge);
            var edgeFromSet = this.getEdgesFrom(edge.getFromNode());
            if (!edgeFromSet) {
                edgeFromSet = new Set();
                this.fromNodeToEdgeSetMap.put(edge.getFromNode(), edgeFromSet)
            }
            edgeFromSet.add(edge);
            var edgeToSet = this.getEdgesTo(edge.getToNode());
            if (!edgeToSet) {
                edgeToSet = new Set();
                this.toNodeToEdgeSetMap.put(edge.getToNode(), edgeToSet)
            }
            edgeToSet.add(edge);
        } else {
            throw new Error("Each edge must be unique.");
        }
    },

    /**
     * @param {GraphNode} node
     */
    addNode: function(node) {

        //TODO BRN:
        if (!this.nodeSet.contains(node)) {
            this.nodeSet.add(node);
            this.valueToNodeMap.put(node.getValue(), node);
        } else {
            throw new Error("Each node must be unique. A node with value '" + node.getValue() + "' already exists.");
        }
    },

    /**
     * @protected
     * @param {*} value
     * @return {GraphNode}
     */
    getNode: function(value) {
        return this.valueToNodeMap.get(value);
    },

    /**
     * @protected
     * @param {GraphNode} fromNode
     * @return {Set<GraphEdge>}
     */
    getEdgesFrom: function(fromNode) {
        return this.fromNodeToEdgeSetMap.get(fromNode);
    },

    /**
     * @protected
     * @param {GraphNode} toNode
     * @return {Set<GraphEdge>}
     */
    getEdgesTo: function(toNode) {
        return this.toNodeToEdgeSetMap.get(toNode);
    },

    /**
     * Get nodes that are connected by edges leading from the node parameter
     * @protected
     * @param {GraphNode} fromNode
     * @return {Set<GraphNode>}
     */
    getNodesFrom: function(fromNode) {
        var nodesFromSet = new Set();
        var edgeFromSet = this.getEdgesFrom(fromNode);
        if (edgeFromSet) {
            edgeFromSet.forEach(function(edge) {
                nodesFromSet.add(edge.getToNode());
            });
        }
        return nodesFromSet;
    },

    /**
     * Get nodes that are connected by edges leading to the node parameter
     * @protected
     * @param {GraphNode} toNode
     * @return {Set<GraphNode>}
     */
    getNodesTo: function(toNode) {
        var nodesToSet = new Set();
        var edgeToSet = this.getEdgesTo(toNode);
        if (edgeToSet) {
            edgeToSet.forEach(function(edge) {
                nodesToSet.add(edge.getFromNode());
            });
        }
        return nodesToSet;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Graph;
