//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../lib/Annotate').annotate;
var AnnotateCompiler = require('../../../lib/compiler/AnnotateCompiler');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var AnnotateCompilerTests = {

    /**
     *
     */
    annotateCompilerSimpleCompileTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        //TODO BRN: Perform a dead simple compile test


         // Run Test
         //-------------------------------------------------------------------------------


    }).with('@Test("AnnotateCompiler simple compile test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AnnotateCompilerTests;
