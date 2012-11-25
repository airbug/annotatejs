//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../lib/Annotate');
var Directory = require('../../../lib/compiler/Directory');
var File = require('../../../lib/compiler/File');
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
 * 1) Instantiation of a new File
 * 2) That the "getAbsoluteFilePath" value is correct
 */
var fileInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testAbsoluteFilePath = "/myfile.js";
        this.testFile = new File(this.testAbsoluteFilePath);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.testFile.getAbsoluteFilePath(), "/myfile.js",
            "Assert getAbsoluteFilePath returns expected value after instantiation");
    }
};
annotate(fileInstantiationTest).with(
    test().name("File instantiation test")
);


/**
 * This tests
 * 1)
 */
var fileGetFilePathToAnotherFileTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {

        // NOTE BRN: For now only absolute file paths are supported

        this.testValues = [
            {
                fromFilePath: '/fromFile.js',
                toFilePath: '/toFile.js',
                expectedFilePath: './toFile.js'
            },
            {
                fromFilePath: '/somedir/fromFile.js',
                toFilePath: '/toFile.js',
                expectedFilePath: '../toFile.js'
            },
            {
                fromFilePath: '/somedir/anotherdir/fromFile.js',
                toFilePath: '/toFile.js',
                expectedFilePath: '../../toFile.js'
            },
            {
                fromFilePath: '/some/common/dir/fromFile.js',
                toFilePath: '/some/common/dir/toFile.js',
                expectedFilePath: './toFile.js'
            },
            {
                fromFilePath: '/some/common/dir/fromFile.js',
                toFilePath: '/some/common/dir/anotherdir/toFile.js',
                expectedFilePath: './anotherdir/toFile.js'
            },
            {
                fromFilePath: '/some/common/dir/differentdir/fromFile.js',
                toFilePath: '/some/common/dir/anotherdir/toFile.js',
                expectedFilePath: '../anotherdir/toFile.js'
            }
        ];
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        this.testValues.forEach(function(testValue) {
            var testFromFile = new File(testValue.fromFilePath);
            var testToFile = new File(testValue.toFilePath);
            var resultFilePath = testFromFile.getFilePathToAnotherFile(testToFile);
            test.assertEqual(resultFilePath, testValue.expectedFilePath,
                "Assert result of getFilePathToAnotherFile using fromFile '" + testValue.fromFilePath + "' and toFile '" +
                 testValue.toFilePath + "' is correct");
        });
    }
};
annotate(fileGetFilePathToAnotherFileTest).with(
    test().name("File getFilePathToAnotherFile test")
);
