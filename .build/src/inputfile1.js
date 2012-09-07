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

    // TODO BRN: Annotate compiler should be able to have CompilerAnnotationProcessors added to it. Each processor
    // should be labeled with a priority so that we can tell the order in which we should process. Each processor
    // should process as a batch. Each processor should be passed the annotation along with the entire sourceTree.

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
            var sourceTree = javascriptParser.parse(sourceString);
            var script = new Script(sourceTree, sourceFile);
            _this.application.addScript(script);
        });


        // TODO BRN: Search through the source tree for annotate js annotations.
        // TODO BRN: Create Annotation objects for each one
        // TODO BRN: Pass each Annotation object to the CompilerAnnotationProcessors

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

