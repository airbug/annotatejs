//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Application = require('../Application');
var Class = require('../../Class');
var CompilerChannel = require('../CompilerChannel');
var CompilerModule = require('./CompilerModule');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DependencyManager = Class.extend(CompilerModule, {

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
    // CompilerModule Implementation
    //-------------------------------------------------------------------------------

    initialize: function() {
        CompilerChannel.subscribe(Application.Messages.ADD_SCRIPT, this.receiveAddScriptMessage, this);
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    receiveAddScriptMessage: function(message) {

    }

});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyManager;