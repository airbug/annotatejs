//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var LinkedListIterator = require('./LinkedListIterator');
var LinkedListNode = require('./LinkedListNode');
var LinkedListView = require('./LinkedListView');
var List = require('./List');
var Map = require('./Map');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var LinkedList = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    /**
     *
     */
    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {LinkedListNode}
         */
        this.backNode = null;

        /**
         * @private
         * @type {number}
         */
        this.count = 0;

        /**
         * @private
         * @type {LinkedListNode}
         */
        this.frontNode = null;

        /**
         * @private
         * @type {Map}
         */
        this.valueToLatestNodeMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {number}
     */
    getCount: function() {
        return this.count;
    },


    //-------------------------------------------------------------------------------
    // Iterable Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {LinkedListIterator}
     */
    iterator: function() {
        return new LinkedListIterator(this);
    },

    /**
     * @param {*} value
     * @return {LinkedListIterator}
     */
    iteratorFrom: function(value) {
        var startNode = this.getLatestNodeWithValue(value);
        return new LinkedListIterator(this, startNode);
    },


    //-------------------------------------------------------------------------------
    // Object Override
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[LinkedList] {\n";
        output += "\tlist: [\n";
        var listOutput = "";

        if (this.frontNode) {
            var currentNode = this.frontNode;
            listOutput += currentNode.toString();
            while (currentNode.hasNextNode()) {
                currentNode = currentNode.getNextNode();
                listOutput += currentNode.toString();
            }
        }
        if (listOutput) {
            var listOutputParts = listOutput.split("\n");
            for (var i = 0, size = listOutputParts.length; i < size; i++) {
                var listOutputPart = listOutputParts[i];
                output += "\t\t" + listOutputPart + "\n";
            }
        }
        output += "\t]\n";
        output += "}\n";
        return output;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {*} value
     */
    addBack : function(value) {
        var node = this.createNode(value);
        if (this.frontNode === null && this.backNode === null) {
            this.frontNode = node;
            this.backNode = node;
        } else {
            var currentLastNode = this.backNode;
            node.previousNode = currentLastNode;
            currentLastNode.nextNode = node;
            this.backNode = node;
        }
        this.count++;
    },

    /**
     * @param {*} value
     */
    addFront : function(value) {
        var node = this.createNode(value);
        if (this.frontNode === null && this.backNode === null) {
            this.frontNode = node;
            this.backNode = node;
        } else {
            var currentFirstNode = this.frontNode;
            node.nextNode = currentFirstNode;
            currentFirstNode.previousNode = node;
            this.frontNode = node;
        }
        this.count++;
    },

    /**
     * @param {function(*)} func
     */
    forEach: function(func) {
        var iterator = this.iterator();
        while (iterator.hasNext()) {
            var value = iterator.getNext();
            func(value);
        }
    },

    /**
     * @param {number} index
     * @return {*}
     */
    getAt: function(index) {
        if (index < this.getCount()) {

            // NOTE BRN: Iterator technically starts at -1 since it doesn't point to anything to start.
            // So we start the currentIndex at -1 instead of 0.

            var currentIndex = -1;
            var iterator = this.iterator();
            while (iterator.hasNext()) {
                var value = iterator.getNext();
                currentIndex++;
                if (currentIndex === index) {
                    return value;
                }
            }
        } else {
            throw new Error("Index out of bounds");
        }
    },

    /**
     * @return {*} returns undefined if the list is empty
     */
    getFirst: function() {
        if (this.frontNode) {
            return this.frontNode.getValue();
        }
        return undefined;
    },

    /**
     * @return {*} returns undefined if the list is empty
     */
    getLast: function() {
        if (this.backNode) {
            return this.backNode.getValue();
        }
        return undefined;
    },

    /**
     * @return {boolean}
     */
    isEmpty: function() {
        return this.count === 0;
    },

    /**
     *
     */
    removeFirst: function() {

    },

    /**
     *
     */
    removeLast: function() {

    },

    /**
     * @param {*} value1
     * @param {*} value2
     * @return {LinkedListView}
     */
    view: function(value1, value2) {
        var node1 = this.valueToLatestNodeMap.get(value1);
        var node2 = this.valueToLatestNodeMap.get(value2);

        if (node1 && node2) {
            return new LinkedListView(this, node1, node2);
        } else {
            throw new Error("View values don't exist");
        }
    },

    viewAt: function(index1, index2) {

    },


    //-------------------------------------------------------------------------------
    // Private Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {*} value
     * @return {LinkedListNode}
     */
    getLatestNodeWithValue: function(value) {
        return this.valueToLatestNodeMap.get(value);
    },

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */
    createNode: function(value) {
        var newNode = new LinkedListNode(value);
        this.mapNode(newNode);
        return newNode;
    },

    /**
     * @private
     * @param {LinkedListNode} node
     */
    mapNode: function(node) {
        this.valueToLatestNodeMap.put(node.getValue(), node);
    },

    unmapNode: function(node) {

    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = LinkedList;
