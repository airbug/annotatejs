//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var SourceNode = require('./SourceNode');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourceTree = Class.extend(SourceNode, {

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

    toString: function() {
        var output = "[SourceTree] {\n";
        var childOutput = "";
        this.childNodes.forEach(function(childNode) {
            childOutput += childNode.toString();
        });
        if (childOutput) {
            output += "  children: [\n";
            var childOutputParts = childOutput.split("\n");
            for (var i = 0, size = childOutputParts.length; i < size; i++) {
                var childOutputPart = childOutputParts[i];
                output += "    " + childOutputPart + "\n";
            }
            output += "  \n";
        }
        output += "}\n";
        return output;
    },


    //-------------------------------------------------------------------------------
    // Class methods
    //-------------------------------------------------------------------------------

    /**
     * @param {function()} func
     */
    walk: function(func) {
        //TODO BRN: perform a depth first walk of the tree and apply the func to each node
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SourceTree;
