/* @someannotation */
function someFunction() {

}
var i = 123.456;

// single line comment
var s = "some string";

// "single line comment with a string"


//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

// @export('InputFile1')

// @require('Application')
// @require('Class')
// @require('Directory')
// @require('JavascriptParser')
// @require('Script')
// @require('Set')
// @require("SourcePath")


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AnnotateCompiler = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Application}
         */
        this.application = new Application();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------
    /**
     * @param {Set<SourcePath>} sourcePathSet
     * @param {Directory} outputDirectory
     */
    compile: function(sourcePathSet, outputDirectory) {
        this.application.setOutputDirectory(outputDirectory);
        var finalSourceFileSet = new Set();
        sourcePathSet.forEach(function(sourcePath) {
            var sourceFileSet = sourcePath.getSourceFiles();
            finalSourceFileSet.addAll(sourceFileSet);
        });
        var _this = this;
        finalSourceFileSet.forEach(function(sourceFile) {
            var sourceString = sourceFile.getSource();
            var javascriptParser = new JavascriptParser();
            var sourceDocument = javascriptParser.parse(sourceString);
            var script = new Script(sourceDocument, sourceFile);
            _this.application.addScript(script);
        });

        return this.application;
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {Array<string>} sourcePaths
 * @param {string} outputPath
 */
AnnotateCompiler.compile = function(sourcePaths, outputPath) {
    var sourcePathSet = new Set();
    sourcePaths.forEach(function(sourcePathString) {
        var sourcePath = new SourcePath(sourcePathString);
        sourcePathSet.add(sourcePath);
    });
    var outputDirectory = new Directory(outputPath);
    var compiler = new AnnotateCompiler();
    return compiler.compile(sourcePathSet, outputDirectory);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AnnotateCompiler;

