//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotationSourceNode = require('../source/node/AnnotationSourceNode');
var Application = require('../Application');
var Class = require('../../Class');
var Compiler = require('../Compiler');
var CompilerException = require('../CompilerException');
var DependencyGraph = require('./DependencyGraph');
var Event = require('../../Event');
var EventDispatcher = require('../../EventDispatcher');
var Export = require('./Export');
var ICompilerModule = require('./ICompilerModule');
var List = require('../../List');
var Map = require('../../Map');
var MonitorManager = require('../monitor/MonitorManager');
var Require = require('./Require');


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
         * @type {boolean}
         */
        this.dependenciesUpdated = false;

        /**
         * @private
         * @type {Map<AnnotationSourceNode, Export>}
         */
        this.exportAnnotationSourceNodeToExportMap = new Map();

        /**
         * @private
         * @type {Map<AnnotationSourceNode, Require>}
         */
        this.requireAnnotationSourceNodeToRequireMap = new Map();
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
        compiler.addEventListener(Compiler.EventTypes.PROCESS_CHANGE_LIST_COMPLETE,
            this.hearCompilerProcessChangeListCompleteEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Public Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @return List<Script>
     */
    getScriptsInDependentOrder: function() {
        var scriptList = this.dependencyGraph.getScriptsInDependentOrder();
        return scriptList;
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Export} export$
     */
    addExport: function(export$) {
        this.dependencyGraph.addExport(newExport);
        this.dependenciesUpdated = true;
    },

    /**
     * @private
     * @param {Require} require$
     */
    addRequire: function(require$) {
        this.dependencyGraph.addRequire(require$);
        this.dependenciesUpdated = true;
    },

    /**
     * @private
     * @param {AnnotationSourceNode} annotationSourceNode
     */
    monitorAnnotationSourceNode: function(annotationSourceNode) {
        var annotationSourceNodeMonitor = MonitorManager.generateMonitor(annotationSourceNode);
    },

    /**
     * @private
     * @param {Script} script
     */
    monitorScript: function(script) {
        var scriptMonitor =  MonitorManager.generateMonitor(script);
        //scriptMonitor.
        //TODO BRN: Add listeners for new annotation nodes of types require and types export
    },

    /**
     * @private
     */
    performDependenciesUpdatedCheck: function() {
        if (this.dependenciesUpdated) {
            this.dependenciesUpdated = false;
            this.processUpdatedDependencies();
        }
    },

    /**
     * @private
     * @param {Script} newScript
     */
    processNewScript: function(newScript) {
        this.dependencyGraph.addScript(newScript);
        var _this = this;
        newScript.walk(function(sourceNode) {
            if (Class.doesExtend(sourceNode, AnnotationSourceNode)) {
                if (sourceNode.getName() === 'require') {
                    _this.processNewRequireAnnotationSourceNode(sourceNode);
                } else if (sourceNode.getName() === 'export') {
                    _this.processNewExportAnnotationSourceNode(sourceNode);
                }
            }
        });
        this.monitorScript(newScript);
        this.dependenciesUpdated = true;
    },

    /**
     * @private
     * @param {AnnotationSourceNode} exportAnnotationSourceNode
     */
    processNewExportAnnotationSourceNode: function(exportAnnotationSourceNode) {

        //TODO BRN: Replace this with out own expression evaluator so that we don't open up security holes with the eval() statement

        var exportName = eval(exportAnnotationSourceNode.getArgumentExpression(0));
        var newExport = new Export(exportName, exportAnnotationSourceNode, exportAnnotationSourceNode.getOwnerDocument());
        this.exportAnnotationSourceNodeToExportMap.put(exportAnnotationSourceNode, newExport);
        this.addExport(newExport);
    },

    /**
     * @private
     * @param {AnnotationSourceNode} requireAnnotationSourceNode
     */
    processNewRequireAnnotationSourceNode: function(requireAnnotationSourceNode) {

        //TODO BRN: Replace this with out own expression evaluator so that we don't open up security holes with the eval() statement

        var requireName = eval(requireAnnotationSourceNode.getArgumentExpression(0));
        var newRequire = new Require(requireName, requireAnnotationSourceNode, requireAnnotationSourceNode.getOwnerDocument());
        this.requireAnnotationSourceNodeToRequireMap.put(requireAnnotationSourceNode, newRequire);
        this.addRequire(newRequire);
    },

    /**
     * @private
     */
    processUpdatedDependencies: function() {

        // NOTE BRN: Instead of looking for these problems immediately, we wait until PROCESS_CHANGE_LIST_COMPLETE
        // then we know we're in a final state and can look for problems all at once. Taking this approach we have to
        // have the DependencyGraph store this type of info so that we can easily look it up. Info such as scripts with
        // more than one export, export names that are used more than once, nodes that have requires that can't be
        // matched, and circular dependencies in the graph.

        var scriptsWithMoreThanOneExport = this.dependencyGraph.getScriptsWithMoreThanOneExport();
        var exportsWithDuplicateNames = this.dependencyGraph.getExportsWithDuplicateNames();


        // TODO BRN: New errors are discovered here. When an error is added, it should add a Monitor to the parts of
        // the sourceDocument that are causing the error. If the monitor detects a change, such as a duplicate Export
        // being removed, the monitor should then notify that the error can be removed and have the error manager
        // remove the error.


        if (scriptsWithMoreThanOneExport.getCount() > 0) {

            //TODO BRN: This concept only works for a one pass compiler. If we're building a continuous compiler than
            //this needs to add to a list of know errors but should continue the compilation process.

            throw new CompilerException("Cannot provide more than one export annotation per file. Script named '" +
                newExport.getExportAnnotationSourceNode().getName() + "' has more than one Export.",
                newExport.getExportAnnotationSourceNode().getStartLineNumber());
        }

        if (exportsWithDuplicateNames.getCount() > 0) {

            //TODO BRN: This concept only works for a one pass compiler. If we're building a continuous compiler than
            //this needs to add to a list of know errors but should continue the compilation process.

            throw new CompilerException("Export '" + newExport.getExportName() + "' already declared.",
                newExport.getExportAnnotationSourceNode().getStartLineNumber());
        }
        // TODO BRN: Look for broken Edges in the DependencyGraph. If a broken Edge is found, then we should add an
        // error for that edge. Any errors that exist for Edges that have been fixed should be removed.
        this.dispatchEvent(new Event(DependencyManager.EventTypes.DEPENDENCIES_UPDATED));
    },


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

    /**
     * @private
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
    hearCompilerProcessChangeListCompleteEvent: function(event) {
        this.performDependenciesUpdatedCheck();
    }
});
Class.implement(DependencyManager, ICompilerModule);


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

DependencyManager.EventTypes = {
    DEPENDENCIES_UPDATED: "DependencyManager:DependenciesUpdated"
};

DependencyManager.MODULE_NAME = "DependencyManager";


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyManager;
