//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../lib/Annotate');
var Directory = require('../../../lib/compiler/Directory');
var OutputFile = require('../../../lib/compiler/OutputFile');
var TestAnnotation = require('../../../lib/unit/TestAnnotation');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var test = TestAnnotation.test;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) Instantiation of a new OutputFile
 * 2) That the "getAbsoluteFilePath" value is correct
 * 3) That the "getRelativeFilePath" value is correct
 */
var outputFileInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testRelativeFilePath = "myfile.js";
        this.testDirectoryPath = "/";
        this.testDirectory = new Directory(this.testDirectoryPath);
        this.outputFile = new OutputFile(this.testDirectory, this.testRelativeFilePath);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.outputFile.getAbsoluteFilePath(), "/myfile.js",
            "Assert getAbsoluteFilePath returns expected value after instantiation");
        test.assertEqual(this.outputFile.getRelativeFilePath(), "myfile.js",
            "Assert getRelativeFilePath reutrns expected value instantiation");
    }
};
annotate(outputFileInstantiationTest).with(
    test().name("OutputFile instantiation test")
);
