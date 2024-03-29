//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var Token = require('./Token');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var BlockCommentToken = Class.extend(Token, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(characterListView, commentType) {

        this._super('block_comment', characterListView);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {string}
         */
        this.commentType = commentType;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[BlockCommentToken] {\n";
        output += "\ttype: " + this.type + ",\n";
        output += "\tcommentType: " + this.commentType + "\n";
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

BlockCommentToken.CommentType = {
    MULTI_LINE: 'multi_line',
    SINGLE_LINE: 'single_line'
};

//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = BlockCommentToken;
