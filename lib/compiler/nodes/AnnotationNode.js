//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var List = require('../../List');
var SourceNode = require('../SourceNode');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AnnotationNode = Class.extend(SourceNode, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(annotationToken) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {AnnotationToken}
         */
        this.annotationToken = annotationToken;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getName: function() {
        return this.annotationToken.getNameIdentifierToken().getCharacterListViewAsString();
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[Annotation] {\n";
        output += "  name: " + this.getName() + ",\n";
        if (this.annotationToken.getBlockArgumentsToken()) {
            var argumentOutput = "";
            this.annotationToken.getBlockArgumentsToken().getArgumentsTokenList().forEach(function(argument) {
                argumentOutput += argument.getCharacterListViewAsString();
            });
            if (argumentOutput) {
                output += "  arguments: [\n";
                var argumentOutputParts = argumentOutput.split("\n");
                for (var i = 0, size = argumentOutputParts.length; i < size; i++) {
                    var argumentOutputPart = argumentOutputParts[i];
                    output += "    " + argumentOutputPart + "\n";
                }
                output += "  ]\n";
            }
        }
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
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AnnotationNode;
