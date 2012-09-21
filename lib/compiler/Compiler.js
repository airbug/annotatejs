//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AddScriptChange = require('./change/AddScriptChange');
var Application = require('./Application');
var ChangeList = require('./change/ChangeList');
var Class = require('../Class');
var Event = require('../Event');
var EventDispatcher = require('../EventDispatcher');
var JavascriptParser = require('./JavascriptParser');
var List = require('../List');
var Map = require('../Map');
var Script = require('./source/Script');
var Set = require('../Set');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Compiler = Class.extend(EventDispatcher, {

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

        /**
         * @private
         * @type {List<string, ICompilerModule>}
         */
        this.compilerModuleNameToCompilerModuleMap = new Map();

        /**
         * @private
         * @type {List}
         */
        this.compilerModuleExecutionList = new List();

        /**
         * @private
         * @type {CompilerProperties}
         */
        this.compilerProperties = undefined;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {Application}
     */
    getApplication: function() {
        return this.application;
    },

    /**
     * @param {ICompilerModule} compilerModule
     */
    addCompilerModule: function(compilerModule) {
        this.compilerModuleNameToCompilerModuleMap.put(compilerModule.getModuleName(), compilerModule);
        this.compilerModuleExecutionList.add(compilerModule);
    },

    /**
     * @param {string} compilerModuleName
     * @return {ICompilerModule}
     */
    getCompilerModule: function(compilerModuleName) {
        return this.compilerModuleNameToCompilerModuleMap.get(compilerModuleName);
    },

    /**
     * @return {CompilerProperties}
     */
    getCompilerProperties: function() {
        return this.compilerProperties;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Set<SourcePath>} sourcePathSet
     * @param {CompilerProperties} compilerProperties
     */
    compile: function(sourcePathSet, compilerProperties) {
        this.compilerProperties = compilerProperties;
        var finalSourceFileSet = new Set();
        sourcePathSet.forEach(function(sourcePath) {
            var sourceFileSet = sourcePath.getSourceFiles();
            finalSourceFileSet.addAll(sourceFileSet);
        });
        this.initialize();

        // TODO BRN: These changes should be sent to the compiler by some mechanism that's constantly monitoring the
        // source code for changes and building change lists.

        var changeList = new ChangeList();
        finalSourceFileSet.forEach(function(sourceFile) {
            var javascriptParser = new JavascriptParser(sourceFile);

            //TEST
            var startTime = (new Date()).getTime();

            var script = javascriptParser.parse();

            //TEST
            var endTime = (new Date()).getTime();
            console.log("Parsing completed in " + (endTime - startTime) + "ms");

            //TEST
            //console.log(script.toString());

            var change = new AddScriptChange(script);
            changeList.addChange(change);
        });
        this.processChangeList(changeList);
    },

    // NOTE BRN: Changes in the ChangeList should be based around the SourceDocument/Scripts and not the the token list or
    // CharacterList. This will allow the compiler to deal with valid changes to the SourceDocument and the Parser to deal
    // with changes to the character and token lists. The Parser would then shuttle PubSub messages over to the Compiler
    // describing the changes to the SourceDocument.

    /**
     * @param {ChangeList} changeList
     */
    processChangeList: function(changeList) {
        this.dispatchEvent(new Event(Compiler.EventTypes.PROCESS_CHANGE_LIST_START));
        while (changeList.getCount() > 0) {
            var change = changeList.popChange();
            change.applyChange(this.application);
        }
        this.dispatchEvent(new Event(Compiler.EventTypes.PROCESS_CHANGE_LIST_COMPLETE));
    },

    /**
     *
     */
    initialize: function() {
        var _this = this;
        this.compilerModuleExecutionList.forEach(function(compilerModule) {
            compilerModule.initialize(_this);
        });
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

Compiler.EventTypes = {
    PROCESS_CHANGE_LIST_COMPLETE: "Compiler:ProcessChangeListComplete",
    PROCESS_CHANGE_LIST_START: "Compiler:ProcessChangeListStart"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Compiler;
