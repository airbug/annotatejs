//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var JavascriptParser = require('../lib/compiler/JavascriptParser');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var JavascriptParserTest = {

    /**
     *
     */
    simpleParseTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var sourceCode = "function someFunction() {}";
        var javascriptParser = new JavascriptParser();


        // Run Test
        //-------------------------------------------------------------------------------

        var sourceTree = javascriptParser.parse(sourceCode);


        //TODO BRN: Validate the sourceTree

    }).with('@Test("Simple parse test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = JavascriptParserTest;
