//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var DocumentNode = require('./DocumentNode');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Document = Class.extend(DocumentNode, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------


    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------
    // Class methods
    //-------------------------------------------------------------------------------

    /**
     * Performs a top down depth walk of the document.
     * @param {function()} func
     */
    walk: function(func) {
        var rootNode = this;
        if (rootNode) {
            this.walkRecursive(rootNode, func);
        }
    },


    //-------------------------------------------------------------------------------
    // Private Class methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {DocumentNode} childNode
     */
    updateChildNodesDocument: function(childNode) {
        childNode.setOwnerDocument(this);
        var _this = this;
        childNode.getChildNodes().forEach(function(childNodeChild) {
            _this.updateChildNodesDocument(childNodeChild);
        });
    },

    /**
     * @private
     * @param {DocumentNode} node
     * @param {function(*)} func
     */
    walkRecursive: function(node, func) {
        func(node);
        var _this = this;
        node.getChildNodes().forEach(function(childNode) {
            _this.walkRecursive(childNode, func);
        });
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Document;
