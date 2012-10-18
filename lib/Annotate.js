//TODO BRN: This should be moved to a resources folder and consumed by the compiler which will add it in to any code it compiles


//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotation = require('./Annotation');
var AnnotationProcessor = require('./AnnotationProcessor');
var Class = require('./Class');
var ClientJsAnnotateCompiler = require('./compiler/ClientJsAnnotateCompiler');
var List = require('./List');
var Map = require('./Map');
var NodeJsAnnotateCompiler = require('./compiler/NodeJsAnnotateCompiler');
var Obj = require('./Obj');
var SourceFile = require('./compiler/source/SourceFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Annotate = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(reference) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {*}
         */
        this.reference = reference;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @return {...*}
     */
    with: function() {
        for (var i = 0, size = arguments.length; i < size; i++) {
            var annotation = arguments[i];
            var annotationTypeList =  Annotate.annotationMap.get(annotation.getType());
            if (!annotationTypeList) {
                annotationTypeList = new List();
                Annotate.annotationMap.put(annotation.getType(), annotationTypeList);
            }
            annotationTypeList.add(annotation);
            annotation.setReference(this.reference);
            Annotate.processAnnotation(annotation);
        }

        // NOTE BRN: Return the reference so that whatever function we're annotating is passed through and the reference
        // is assigned correctly.

        return this.reference;
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

Annotate.annotationMap = new Map();

Annotate.annotationProcessorMap = new Map();

Annotate.processingAnnotationsTimeout = null;


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {*} reference
 * @return {Annotate}
 */
Annotate.annotate = function(reference) {
    return new Annotate(reference);
};

/**
 * @param {string} annotationType
 * @return {Annotation}
 */
Annotate.annotation = function(annotationType) {
    return new Annotation(annotationType);
};

/**
 * @param {Annotation} annotation
 */
Annotate.processAnnotation = function(annotation) {
    var annotationProcessorTypeList = Annotate.annotationProcessorMap.get(annotation.getType());
    if (annotationProcessorTypeList) {
        annotationProcessorTypeList.forEach(function(annotationProcessor) {
            annotationProcessor.processAnnotation(annotation);
        });
    }
};

Annotate.registerAnnotationProcessor = function(annotationType, annotationProcessorFunction) {
    var annotationProcessorTypeList = Annotate.annotationProcessorMap.get(annotationType);
    if (!annotationProcessorTypeList) {
        annotationProcessorTypeList = new List();
        Annotate.annotationProcessorMap.put(annotationType, annotationProcessorTypeList);
    }
    var annotationProcessor = new AnnotationProcessor(annotationProcessorFunction);
    annotationProcessorTypeList.add(annotationProcessor);

    // Process any annotations that have already been registered for this type.

    var annotationTypeList =  Annotate.annotationMap.get(annotationType);
    if (annotationTypeList) {
        annotationTypeList.forEach(function(annotation) {
            Annotate.processAnnotation(annotation);
        });
    }
};

//TODO BRN: These two functions are temporary until we can provide our own package manager for annotate js. For now,
// this allows us to easily make compilation accessible when annotate js is included in node js projects.
/**
 * @param {Array<string>} sourceHomePaths File paths to where your source code lives. Should be the root of your source files. Source files can be broken up in to multiple homes.
 * @param {string} outputPath
 * @param {string} outputFileName
 */
Annotate.compileClientJs = function(sourceHomePaths, outputPath, outputFileName) {
    ClientJsAnnotateCompiler.compile(sourceHomePaths, outputPath, outputFileName);
};

//TODO BRN: These two functions are temporary until we can provide our own package manager for annotate js. For now,
// this allows us to easily make compilation accessible when annotate js is included in node js projects.
/**
 * @param {Array<string>} sourceHomePaths File paths to where your source code lives. Should be the root of your source files. Source files can be broken up in to multiple homes.
 * @param {string} outputPath
 */
Annotate.compileNodeJs = function(sourceHomePaths, outputPath) {
    NodeJsAnnotateCompiler.compile(sourceHomePaths, outputPath);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Annotate;
