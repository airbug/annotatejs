//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Application = require('../Application');
var Class = require('../../Class');
var Compiler = require('../Compiler');
var CompilerException = require('../CompilerException');
var DependencyGraph = require('./DependencyGraph');
var EventDispatcher = require('../../EventDispatcher');
var ICompilerModule = require('./ICompilerModule');
var List = require('../../List');
var Map = require('../../Map');
var ScriptDependencyMonitor = require('./ScriptDependencyMonitor');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DependencyManager = Class.extend(EventDispatcher, {

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
        this.application = null;

        /**
         * @private
         * @type {DependencyGraph}
         */
        this.dependencyGraph = new DependencyGraph();

        /**
         * @private
         * @type {Map<Script, ScriptDependencyMonitor>}
         */
        this.scriptToScriptDependencyMonitorMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // CompilerModule Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getModuleName: function() {
        return DependencyManager.MODULE_NAME;
    },

    /**
     * @param {Compiler} compiler
     */
    initialize: function(compiler) {
        this.application = compiler.getApplication();
        this.application.addEventListener(Application.EventTypes.SCRIPT_ADDED,
            this.hearApplicationScriptAddedEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Public Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @return List<Script>
     */
    getScriptListInDependentOrder: function() {
        var scriptList = this.dependencyGraph.getScriptListInDependentOrder();
        return scriptList;
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Script} script
     * @returns {ScriptDependencyMonitor}
     */
    generateScriptDependencyMonitor: function(script) {
        var scriptDependencyMonitor = new ScriptDependencyMonitor(script);
        scriptDependencyMonitor.addEventListener(ScriptDependencyMonitor.EventTypes.EXPORT_ADDED,
            this.hearScriptDependencyMonitorExportAddedEvent, this);
        scriptDependencyMonitor.addEventListener(ScriptDependencyMonitor.EventTypes.REQUIRE_ADDED,
            this.hearScriptDependencyMonitorRequireAddedEvent, this);
        this.scriptToScriptDependencyMonitorMap.put(script, scriptDependencyMonitor);
        return scriptDependencyMonitor;
    },

    /**
     * @private
     * @param {Script} script
     */
    monitorScript: function(script) {
        var scriptDependencyMonitor = this.generateScriptDependencyMonitor(script);
        scriptDependencyMonitor.startMonitoring();
    },

    /**
     * @private
     * @param {Export} newExport
     */
    processNewExport: function(newExport) {
        this.dependencyGraph.addExport(newExport);

        var exportListByScript = this.dependencyGraph.getExportListByScript(newExport.getScript());
        var exportListByExportName = this.dependencyGraph.getExportListByName(newExport.getExportName());


        //TODO BRN: Perhaps instead of looking for these problems immediately, we should wait until PROCESS_CHANGE_LIST_COMPLETE
        // then we know we're in a final state and can look for problems all at once. Taking this approach we'd have to
        // have the DependencyGraph store this type of info so that we can easily look it up. Info such as scripts with
        // more than one export, export names that are used more than once, nodes that have requires that can't be matched,
        // and circular dependencies in the graph

        if (exportListByScript.getCount() > 1) {

            //TODO BRN: This concept only works for a one pass compiler. If we're building a continuous compiler than
            //this needs to add to a list of know errors but should continue the compilation process.

            throw new CompilerException("Cannot provide more than one export annotation per file. Second export named '" +
                newExport.getExportAnnotationNode().getName() + "' should be removed.",
                newExport.getExportAnnotationNode().getStartLineNumber());
        }

        if (exportListByExportName.getCount() > 1) {

            //TODO BRN: This concept only works for a one pass compiler. If we're building a continuous compiler than
            //this needs to add to a list of know errors but should continue the compilation process.

            throw new CompilerException("Export '" + newExport.getExportName() + "' already declared.",
                newExport.getExportAnnotationNode().getStartLineNumber());
        }

        // TODO BRN: Look for broken Edges in the DependencyGraph. If a broken Edge is found, then we should add an
        // error for that edge. Any errors that exist for Edges that have been fixed should be removed.
    },

    /**
     * @private
     * @param newRequire
     */
    processNewRequire: function(newRequire) {
        this.dependencyGraph.addRequire(newRequire);

        // TODO BRN: Look for broken Edges in the DependencyGraph. If a broken Edge is found, then we should add an
        // error for that edge. Any errors that exist for Edges that have been fixed should be removed.
    },

    /**
     * @private
     * @param newScript
     */
    processNewScript: function(newScript) {
        this.dependencyGraph.addScript(newScript);
        this.monitorScript(newScript);

        // TODO BRN: Look for broken Edges in the DependencyGraph. If a broken Edge is found, then we should add an
        // error for that edge. Any errors that exist for Edges that have been fixed should be removed.
    },


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

    /**
     * @param {Event} event
     */
    hearApplicationScriptAddedEvent: function(event) {
        var script = event.getData();
        this.processNewScript(script);
    },

    /**
     * @private
     * @param {Event} event
     */
    hearScriptDependencyMonitorExportAddedEvent: function(event) {
        var newExport = event.getData();
        this.processNewExport(newExport);
    },

    /**
     * @private
     * @param {Event} event
     */
    hearScriptDependencyMonitorRequireAddedEvent: function(event) {
        var newRequire = event.getData();
        this.processNewRequire(newRequire);
    }
});
Class.implement(DependencyManager, ICompilerModule);


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

DependencyManager.MODULE_NAME = "DependencyManager";


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyManager;
