//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var LinkedListViewIterator = require('./LinkedListViewIterator');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var LinkedListView = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    /**
     * @param {LinkedListNode} frontNode
     * @param {LinkedListNode} backNode
     */
    _constructor: function(linkedList, frontNode, backNode) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {LinkedListNode}
         */
        this.backNode = backNode ? backNode : null;

        /**
         * @private
         * @type {LinkedListNode}
         */
        this.frontNode = frontNode ? frontNode : null;

        /**
         * @private
         * @type {LinkedList}
         */
        this.linkedList = linkedList;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Iterable Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {Iterator}
     */
    iterator: function() {
        return new LinkedListViewIterator(this);
    },

    //-------------------------------------------------------------------------------
    // Object Override
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

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
    }


    //-------------------------------------------------------------------------------
    // Private Methods
    //-------------------------------------------------------------------------------


});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = LinkedListView;
