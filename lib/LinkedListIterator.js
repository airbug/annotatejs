/**
 * Based on the google closure library.
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Iterator = require('./Iterator');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var LinkedListIterator = Class.extend(Iterator, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    /**
     * @param {!LinkedList} linkedList
     * @param {LinkedListNode} startNode (optional)
     */
    _constructor: function(linkedList, startNode) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {LinkedListNode}
         */
        this.currentNode = startNode ? startNode : null;

        /**
         * @private
         * @type {LinkedList}
         */
        this.linkedList = linkedList;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {function(*)} func
     * @param {Object} context
     * @return {*}
     */
    find: function(func, context) {
        while (this.hasNext()) {
            var nextValue = this.getNext();
            if (func.call(context, nextValue, this)) {
                return nextValue;
            }
        }
        return undefined;
    },

    /**
     * @return {*}
     */
    getCurrent: function() {
        if (this.currentNode) {
            return this.currentNode.getValue();
        } else {
            throw new Error("No current node");
        }
    },

    /**
     * @return {*}
     */
    getNext: function() {
        if (this.hasNext()) {
            if (this.currentNode === null) {
                this.currentNode = this.linkedList.frontNode;
            } else {
                this.currentNode = this.currentNode.getNextNode();
            }
            return this.currentNode.getValue();
        } else {
            throw new Error("Out of bounds");
        }
    },

    /**
     * @return {*}
     */
    getPrevious: function() {
        if (this.hasPrevious()) {
            this.currentNode = this.currentNode.getPreviousNode();
            return this.currentNode.getValue();
        } else {
            throw new Error("Out of bounds");
        }
    },

    /**
     * @return {boolean}
     */
    hasNext: function() {
        if (this.currentNode !== null) {
            return this.currentNode.hasNextNode();
        } else if (this.linkedList.frontNode !== null) {
            return true;
        }
        return false;
    },

    /**
     * @return {boolean}
     */
    hasPrevious: function() {
        if (this.currentNode !== null) {
            return this.currentNode.hasPreviousNode();
        }
        return false;
    },

    /**
     * @return {*}
     */
    peekNext: function() {
        if (this.hasNext()) {
            if (this.currentNode === null) {
                return this.linkedList.frontNode.getValue();
            } else {
                return this.currentNode.getNextNode().getValue();
            }
        } else {
            throw new Error("Out of bounds");
        }
    },

    /**
     * @return {*}
     */
    peekPrevious: function() {
        if (this.hasPrevious()) {
            return this.currentNode.getPreviousNode().getValue();
        } else {
            throw new Error("Out of bounds");
        }
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = LinkedListIterator;
