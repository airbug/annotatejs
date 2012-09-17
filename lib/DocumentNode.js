/**
 * Rules for DocumentNode
 * 1) A DocumentNode can only be a child of one parent. If you try to add a DocumentNode as a child of second parent
 * it will be removed from the first parent before being added to the second parent.
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Event = require('./Event');
var EventDispatcher = require('./EventDispatcher');
var List = require('./List');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DocumentNode = Class.extend(EventDispatcher, {

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
         * @type {List<DocumentNode>}
         */
        this.childNodes = new List();

        /**
         * @private
         * @type {Document}
         */
        this.ownerDocument = undefined;

        /**
         * @private
         * @type {DocumentNode}
         */
        this.parentNode = undefined;

        //TEST
        console.log("parentNode:" + this.parentNode);
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {List<DocumentNode>}
     */
    getChildNodes: function() {
        if (!this.childNodes) {
            this.childNodes = new List();
        }
        return this.childNodes;
    },

    /**
     * @return {Document}
     */
    getOwnerDocument: function() {
        return this.ownerDocument;
    },

    /**
     * @param {Document} ownerDocument
     */
    setOwnerDocument: function(ownerDocument) {
        this.ownerDocument = ownerDocument;
    },

    /**
     * @return {DocumentNode}
     */
    getParentNode: function() {
        //TEST
        console.log("getParentNode:" + this.parentNode);
        return this.parentNode;
    },

    /**
     * @param {DocumentNode} parentNode
     */
    setParentNode: function(parentNode) {
        this.parentNode = parentNode;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[DocumentNode] {\n";
        output += "\tchildren: [\n";
        var childOutput = "";
        this.getChildNodes().forEach(function(childNode) {
            childOutput += childNode.toString();
        });
        if (childOutput) {
            var childOutputParts = childOutput.split("\n");
            for (var i = 0, size = childOutputParts.length; i < size; i++) {
                var childOutputPart = childOutputParts[i];
                output += "\t\t" + childOutputPart + "\n";
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
     * @param {DocumentNode} childNode
     */
    addChildNode: function(childNode) {

        // NOTE BRN: If this childNode already has a parentNode, we want to remove it from it's current parentNode and
        // append it to this one instead. See Rule #1 up top

        //TEST
        console.log(childNode.getParentNode());

        if (childNode.getParentNode() !== undefined) {
            childNode.getParentNode().removeChildNode(childNode);
        }
        this.childNodes.add(childNode);
        childNode.setParentNode(this);
        childNode.setParentDispatcher(this);
        childNode.setOwnerDocument(this.getOwnerDocument());
        childNode.dispatchEvent(new Event(DocumentNode.EventTypes.NODE_ADDED));
    },

    addChildNodeAt: function(index, childNode) {
        //TODO BRN (OIN)
    },

    // TODO BRN (QUESTION): Should this search recursively?
    /**
     * @param {DocumentNode} childNode
     * @return {boolean}
     */
    containsChildNode: function(childNode) {
        return this.childNodes.contains(childNode);
    },

    /**
     * @param {number} index
     */
    getChildNodeAt: function(index) {
        return this.childNodes.getAt(index);
    },

    /**
     * @return {number}
     */
    numberChildNodes: function() {
        return this.childNodes.getCount();
    },

    /**
     * @param {DocumentNode} childNode
     * @return {boolean}
     */
    removeChildNode: function(childNode) {
        if (this.containsChildNode(childNode)) {
            childNode.dispatchEvent(new Event(DocumentNode.EventTypes.NODE_REMOVED));
            this.childNodes.remove(childNode);
            childNode.setParentNode(undefined);
            childNode.setParentDispatcher(undefined);
            childNode.setOwnerDocument(undefined);
            return true;
        }
        return false;
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

DocumentNode.EventTypes = {
    NODE_ADDED: "DocumentNode:NodeAdded",
    NODE_REMOVED: "DocumentNode:NodeRemoved"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DocumentNode;
