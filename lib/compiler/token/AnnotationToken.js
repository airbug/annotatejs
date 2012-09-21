//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var TokenContainer = require('./TokenContainer');
var TokenTypes = require('./TokenTypes');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AnnotationToken = Class.extend(TokenContainer, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(characterListView, tokenList) {

        this._super(TokenTypes.Statements.ANNOTATION, characterListView, tokenList);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {IdentifierToken}
         */
        this.nameIdentifierToken = tokenList.getAt(1);

        /**
         * @private
         * @type {BlockArgumentsToken}
         */
        this.blockArgumentsToken = (tokenList.getCount() > 2) ? tokenList.getAt(2) : null;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {IdentifierToken}
     */
    getNameIdentifierToken: function() {
        return this.nameIdentifierToken;
    },

    /**
     * @return {BlockArgumentsToken}
     */
    getBlockArgumentsToken: function() {
        return this.blockArgumentsToken;
    }


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------


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

module.exports = AnnotationToken;
