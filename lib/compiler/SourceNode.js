//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var List = require('../List');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourceNode = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.childNodes = new List();

        this.parentNode = null;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    getChildNodes: function() {
        return this.childNodes;
    },

    getParentNode: function() {
        return this.parentNode
    },

    setParentNode: function(parentNode) {
        this.parentNode = parentNode;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[SourceNode] {\n";
        output += "\tchildren: [\n";
        var childOutput = "";
        this.childNodes.forEach(function(childNode) {
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

    addChildNode: function(childNode) {
        //TODO BRN: Make sure that the child node can't be added more than once.
        //TODO BRN: Check if the child node already has a parent. If it does then we should remove it from it's old parent and add it to this one.
        this.childNodes.add(childNode);
        childNode.setParentNode(this);
    },

    addChildNodeAt: function(index, childNode) {
        //TODO BRN: Make sure that the child node can't be added more than once.
        //TODO BRN: Check if the child node already has a parent. If it does then we should remove it from it's old parent and add it to this one.

        this.childNodes.insert(index, childNode);
        childNode.setParentNode(this);
    },

    // QUESTION: Should this search recursively?
    containsChildNode: function(childNode) {
        return this.childNodes.contains(childNode);
    },

    /**
     * @param {number} index
     */
    getChildNode: function(index) {
        return this.childNodes.getAt(index);
    },

    numberChildNodes: function() {
        return this.childNodes.getCount();
    },

    removeChildNode: function(childNode) {
        if (this.containsChildNode(childNode)) {
            this.childNodes.remove(childNode);
            childNode.setParentNode(null);
            return true;
        }
        return false;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SourceNode;
