//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var DocumentNode = require('../../DocumentNode');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourceNode = Class.extend(DocumentNode, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super(this);


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
        var output = "[SourceNode] {\n";
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
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SourceNode;