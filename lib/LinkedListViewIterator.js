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

var LinkedListViewIterator = Class.extend(Iterator, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(linkedListView) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {LinkedListNode}
         */
        this.currentNode = null;

        /**
         * @private
         * @type {LinkedListView}
         */
        this.linkedListView = linkedListView;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param func
     * @param context
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
                this.currentNode = this.linkedListView.frontNode;
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
            if (this.currentNode !== this.linkedListView.backNode) {
                return this.currentNode.hasNextNode();
            }
        } else if (this.linkedListView.frontNode !== null) {
            return true;
        }
        return false;
    },

    /**
     * @return {boolean}
     */
    hasPrevious: function() {
        if (this.currentNode !== null) {
            if (this.currentNode !== this.linkedListView.frontNode) {
                return this.currentNode.hasPreviousNode();
            }
        }
        return false;
    },

    peekNext: function() {
        if (this.hasNext()) {
            if (this.currentNode === null) {
                return this.linkedListView.frontNode.getValue();
            } else {
                return this.currentNode.getNextNode().getValue();
            }
        } else {
            throw new Error("Out of bounds");
        }
    },

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

module.exports = LinkedListViewIterator;
