//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../lib/Annotate').annotate;
var Directory = require('../../../lib/compiler/Directory');
var File = require('../../../lib/compiler/File');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var FileTests = {

    /**
     * This tests
     * 1) Instantiation of a new File
     * 2) That the "getAbsoluteFilePath" value is correct
     */
    fileInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testAbsoluteFilePath = "/myfile.js";
        var testFile = new File(testAbsoluteFilePath);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(testFile.getAbsoluteFilePath(), "/myfile.js",
            "Assert getAbsoluteFilePath returns expected value after instantiation");

    }).with('@Test("File instantiation test")'),


    /**
     * This tests
     * 1)
     */
    fileGetFilePathToAnotherFileTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        // NOTE BRN: For now only absolute file paths are supported

        var testValues = [
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


        // Run Test
        //-------------------------------------------------------------------------------

        var _this = this;
        testValues.forEach(function(testValue) {
            var testFromFile = new File(testValue.fromFilePath);
            var testToFile = new File(testValue.toFilePath);
            var resultFilePath = testFromFile.getFilePathToAnotherFile(testToFile);
            _this.assertEqual(resultFilePath, testValue.expectedFilePath,
                "Assert result of getFilePathToAnotherFile using fromFile '" + testValue.fromFilePath + "' and toFile '" +
                 testValue.toFilePath + "' is correct");
        });

    }).with('@Test("File getFilePathToAnotherFile test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = FileTests;
