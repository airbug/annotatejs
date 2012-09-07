//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var List = require('../../List');
var TokenContainer = require('./TokenContainer');
var TokenTypes = require('./TokenTypes');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var BlockArgumentsToken = Class.extend(TokenContainer, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(characterListView, tokenList) {

        this._super(TokenTypes.Blocks.ARGUMENTS, characterListView, tokenList);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        var argumentsTokenList = new List();
        tokenList.forEach(function(token) {
            if (token.getType() === TokenTypes.Other.ARGUMENT) {
                argumentsTokenList.add(token);
            }
        });

        /**
         * @private
         * @type {List<ArgumentToken>}
         */
        this.argumentsTokenList = argumentsTokenList;

    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {List<ArgumentToken>}
     */
    getArgumentsTokenList: function() {
        return this.argumentsTokenList;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[BlockArgumentsToken] {\n";

        output += "}\n";
        return output;
    }

    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = BlockArgumentsToken;
