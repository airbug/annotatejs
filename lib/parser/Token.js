//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var Obj = require('../../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Token = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(type, characterListView) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {LinkedListView}
         */
        this.characterListView = characterListView;

        /**
         * @private
         * @type {string}
         */
        this.type = type;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {LinkedListView}
     */
    getCharacterListView: function() {
        return this.characterListView;
    },

    /**
     * @return {string}
     */
    getCharacterListViewAsString: function() {
        var output = "";
        this.characterListView.forEach(function(character) {
            output += character.getValue();
        });
        return output;
    },

    /**
     * @return {number}
     */
    getStartLineNumber: function() {
        this.characterListView.getFirst().getLineNumber();
    },

    /**
     * @return {string}
     */
    getType: function() {
        return this.type;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------



    toString: function() {
        var output = "[Token] {\n";
        output += "  type: " + this.type + ",\n";
        output += "  value: " + this.getCharacterListViewAsString() + "\n";
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

module.exports = Token;
