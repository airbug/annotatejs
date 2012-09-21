//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../lib/Annotate').annotate;
var JavascriptParser = require('../../../lib/compiler/JavascriptParser');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var JavascriptParserTests = {

    /**
     *
     */
    simpleParseTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        //TODO BRN: Need to create a fake file system for this test OR need to create an interface for retrieving source
        // code so that we can provide a test source OR use sinon.mock.

        /*var sourceFile = "function someFunction() {}";
        var javascriptParser = new JavascriptParser();


        // Run Test
        //-------------------------------------------------------------------------------

        var sourceDocument = javascriptParser.parse();*/


        //TODO BRN: Validate the sourceDocument

    }).with('@Test("Simple parse test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = JavascriptParserTests;
