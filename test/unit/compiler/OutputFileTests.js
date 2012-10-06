//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../lib/Annotate').annotate;
var Directory = require('../../../lib/compiler/Directory');
var OutputFile = require('../../../lib/compiler/OutputFile');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var OutputFileTests = {

    /**
     * This tests
     * 1) Instantiation of a new OutputFile
     * 2) That the "getAbsoluteFilePath" value is correct
     * 3) That the "getRelativeFilePath" value is correct
     */
    outputFileInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testRelativeFilePath = "myfile.js";
        var testDirectoryPath = "/";
        var testDirectory = new Directory(testDirectoryPath);
        var outputFile = new OutputFile(testDirectory, testRelativeFilePath);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(outputFile.getAbsoluteFilePath(), "/myfile.js",
            "Assert getAbsoluteFilePath returns expected value after instantiation");
        this.assertEqual(outputFile.getRelativeFilePath(), "myfile.js",
            "Assert getRelativeFilePath reutrns expected value instantiation");

    }).with('@Test("OutputFile instantiation test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = OutputFileTests;
