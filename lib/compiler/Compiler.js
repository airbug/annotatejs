//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Application = require('./Application');
var Class = require('../Class');
var Event = require('../Event');
var EventDispatcher = require('../EventDispatcher');
var List = require('../List');
var Map = require('../Map');
var Parser = require('../parser/Parser');
var ParserProcess = require('../parser/ParserProcess');
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

        /**
         * @private
         * @type {Parser}
         */
        this.parser = new Parser();
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
     * @param {Set<SourceHome>} sourceHomeSet
     * @param {CompilerProperties} compilerProperties
     */
    compile: function(sourceHomeSet, compilerProperties) {
        this.compilerProperties = compilerProperties;
        this.initialize(sourceHomeSet);
        this.activate();
    },


    //-------------------------------------------------------------------------------
    // Compiler Hooks
    //-------------------------------------------------------------------------------

    /**
     * @protected
     * @param {Set<SourceHome>} sourceHomeSet
     */
    initialize: function(sourceHomeSet) {
        var _this = this;
        this.parser.initialize(sourceHomeSet);
        this.parser.addEventListener(ParserProcess.EventType.CHANGE_LIST_RECEIVED,
            this.handleParserChangeListReceivedEvent, this);
        this.compilerModuleExecutionList.forEach(function(compilerModule) {
            compilerModule.initialize(_this);
        });
    },

    /**
     * @protected
     */
    activate: function() {
        this.parser.activate();
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    // NOTE BRN: Changes in the ChangeList should be based around the SourceDocument/Scripts and not the the token list or
    // CharacterList. This will allow the compiler to deal with valid changes to the SourceDocument and the Parser to deal
    // with changes to the character and token lists. The Parser would then shuttle PubSub messages over to the Compiler
    // describing the changes to the SourceDocument.

    /**
     * @private
     * @param {ChangeList} changeList
     */
    /*processChangeList: function(changeList) {
        this.dispatchEvent(new Event(Compiler.EventType.PROCESS_CHANGE_LIST_START));
        while (changeList.getCount() > 0) {
            var change = changeList.popChange();
            change.applyChange(this.application);
        }
        this.dispatchEvent(new Event(Compiler.EventType.PROCESS_CHANGE_LIST_COMPLETE));
    },*/


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Event} event
     */
    handleParseCompleteEvent: function(event) {
        var parseData = event.data;
        var sourceFilePath = parseData.filePath;

        //TODO BRN: If a script already exists by this name, then remove it.
        var currentScript = this.application.getScriptByPath(sourceFilePath);
        if (currentScript) {
            this.application.removeScript(currentScript);
        }

        //TODO BRN: Convert the parse Data in to a Script object and create the nodes that represent each part of the script
        var script =

        this.application.addScript(script);
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

Compiler.EventType = {
    PROCESS_CHANGE_LIST_COMPLETE: "Compiler:ProcessChangeListComplete",
    PROCESS_CHANGE_LIST_START: "Compiler:ProcessChangeListStart"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Compiler;
