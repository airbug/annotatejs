//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Interface = require('../../Interface');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ICompilerModule = Interface.declare({


    //-------------------------------------------------------------------------------
    // Interface Methods
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getModuleName: function() {},

    /**
     * @param {Compiler} compiler
     */
    initialize: function(compiler) {}
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ICompilerModule;
