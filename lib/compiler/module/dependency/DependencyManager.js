//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotationSourceNode = require('../../source/node/AnnotationSourceNode');
var Application = require('../../Application');
var Class = require('../../../Class');
var Compiler = require('../../Compiler');
var DependencyGraph = require('./DependencyGraph');
var Event = require('../../../Event');
var EventDispatcher = require('../../../EventDispatcher');
var ExportCode = require('./ExportCode');
var ICompilerModule = require('../ICompilerModule');
var List = require('../../../List');
var Map = require('../../../Map');
var MonitorManager = require('../../monitor/MonitorManager');
var RequireCode = require('./RequireCode');
var ScriptMonitor = require('../../monitor/ScriptMonitor');


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
        this.dependenciesError = false;

        /**
         * @private
         * @type {boolean}
         */
        this.dependenciesUpdated = false;
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
        this.application.addEventListener(Application.EventTypes.SCRIPT_REMOVED,
            this.hearApplicationScriptRemovedEvent, this);
        compiler.addEventListener(Compiler.EventTypes.PROCESS_CHANGE_LIST_COMPLETE,
            this.hearCompilerProcessChangeListCompleteEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Public Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Script} script
     * @return {List<Script>}
     */
    getRequiredScriptsOfScript: function(script) {
        return this.dependencyGraph.getRequiredScriptsOfScript(script);
    },

    /**
     * @param {Script} script
     * @return {string}
     */
    getScriptExportName: function(script) {
        return this.dependencyGraph.getScriptExportName(script);
    },

    /**
     * @return List<Script>
     */
    getScriptsInDependentOrder: function() {
        if (this.isDependenciesError()) {
            throw new Error("Cannot determine dependent order because there are errors in the dependencies");
        }
        return this.dependencyGraph.getScriptsInDependentOrder();
    },

    /**
     * @return {boolean}
     */
    isDependenciesError: function() {
        return this.dependenciesError;
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {ExportCode} exportCode
     */
    addExportCode: function(exportCode) {
        //TODO BRN: Check for duplicate errors and other similar errors here that would cause problems in the DependencyGraph
        if (!this.checkExportCodeForNamingErrors(exportCode)) {
            this.dependencyGraph.addExportCode(exportCode);
            if (!this.checkExportCodeForDependencyErrors(exportCode)) {
                this.dependenciesUpdated = true;
            }
        }
    },

    /**
     * @private
     * @param {RequireCode} requireCode
     */
    addRequireCode: function(requireCode) {
        if (!this.checkRequireCodeForNamingErrors(requireCode)) {
            this.dependencyGraph.addRequireCode(requireCode);
            if (!this.checkRequireCodeForDependencyErrors(requireCode)) {
                this.dependenciesUpdated = true;
            }
        }
    },

    /**
     * @private
     * @param {ExportCode} exportCode
     * @return {boolean}
     */
    checkExportCodeForDependencyErrors: function(exportCode) {

        // NOTE BRN: We decided that processing all changes at once is against the theme of this processor. Each change
        // should be processed as it comes in.

        // TODO BRN: New errors are discovered here and some errors are fixed. We should only have to look for errors
        // related to the export that's being added.

        // TODO BRN: Look to see if the script that holds this export has more than one export. If so, see if there's
        // already an error for this type of problem on the script. If there is, add this export to the list of exports
        // causing the problem. If not, create a new error and store it away somewhere for look up later.

        // TODO BRN: Look to see if there is more than one export using this export's name. If so, see if there's
        // already an error for this type of problem. If there is, add this export to the list of exports causing the
        // problem, if not create a new error and store it away for look up later.

        // TODO BRN: Look up errors related to requires that require exports by this name. Remove those errors.

        // TODO BRN: Check for circular dependency errors.

        return false;
    },

    /**
     * @private
     * @param {ExportCode} exportCode
     * @return {boolean}
     */
    checkExportCodeForNamingErrors: function(exportCode) {
        var badCharacterTest = new RegExp("[~`!@#$%^&*()-+={}\\[\\]|\\\\:;\"''<>,.?/]", "g");
        if (exportCode.getExportName().match(badCharacterTest)) {
            //TODO BRN: Store this export code away as it has an error. Also create the Error and send it to the
            // ErrorManager
            return true;
        }
        return false;
    },

    /**
     * @private
     * @param {RequireCode} requireCode
     * @return {boolean}
     */
    checkRequireCodeForDependencyErrors: function(requireCode) {
        // TODO BRN: Look to see if this require is a duplicate of another require on this script. If so, see if there's
        // already an error for this type of problem on the script. If there is, add this require to the list of requires
        // causing the problem. If not, create a new error and store it away somewhere for look up later.

        // TODO BRN: Look to see if the export that this require requires exists. If it doesn't, see if there's an error
        // already tracking this problem (could be that this is a duplicate require of another that already had an error
        // for this issue) If there's no error, then create one and store it for lookup later.

        return false;
    },

    /**
     * @private
     * @param {RequireCode} requireCode
     * @return {boolean}
     */
    checkRequireCodeForNamingErrors: function(requireCode) {
        if (requireCode.isRequireFilePath()) {
            //TODO BRN: We want to possibly support this case later. For now we don't though.
            //throw new Error("Requiring by file currently not supported. If you'd like support for this send us a patch!");
            return true;
        }
        return false;
    },

    /**
     * @private
     */
    dispatchDependenciesUpdated: function() {
        this.dispatchEvent(new Event(DependencyManager.EventTypes.DEPENDENCIES_UPDATED));
    },

    /**
     * @private
     * @param {Script} script
     */
    monitorScript: function(script) {
        var scriptMonitor =  MonitorManager.generateMonitor(script);
        scriptMonitor.addResponder(ScriptMonitor.AlertTypes.NODE_ADDED, "annotation:export",
            this.respondNodeAddedAnnotationExportAlert, this);
        scriptMonitor.addResponder(ScriptMonitor.AlertTypes.NODE_ADDED, "annotation:require",
            this.respondNodeAddedAnnotationRequireAlert, this);
        scriptMonitor.addResponder(ScriptMonitor.AlertTypes.NODE_REMOVED, "annotation:export",
            this.respondNodeRemovedAnnotationExportAlert, this);
        scriptMonitor.addResponder(ScriptMonitor.AlertTypes.NODE_REMOVED, "annotation:require",
            this.respondNodeRemovedAnnotationRequireAlert, this);
    },

    /**
     * @private
     */
    performDependenciesUpdatedCheck: function() {
        if (this.dependenciesUpdated) {
            this.dependenciesUpdated = false;
            this.dispatchDependenciesUpdated();
        }
    },

    /**
     * @private
     * @param {Script} addedScript
     */
    processAddedScript: function(addedScript) {
        this.dependencyGraph.addScript(addedScript);

        // TODO BRN: This should be removed. Instead of requiring each module to fully walk a new script, which requires
        // a significant amount of processing. Each change to the SourceDocument should come over in a small micro
        // change. For instance, when a new script is added, it should start as only the base level Script node when
        // we process it here. Then each node should be added to it so that each system only needs to process the bits
        // and pieces that they care about. To do this, we need to update the parser. Instead of having the parser
        // modify the DocumentSource directly, it should instead generate a change list of the nodes added, removed,
        // moved, and modified. Each change to a single node should be represented as a single change in the change list

        var _this = this;
        addedScript.walk(function(sourceNode) {
            if (Class.doesExtend(sourceNode, AnnotationSourceNode)) {
                if (sourceNode.getName() === 'require') {
                    _this.processAddedRequireAnnotationSourceNode(sourceNode);
                } else if (sourceNode.getName() === 'export') {
                    _this.processAddedExportAnnotationSourceNode(sourceNode);
                }
            }
        });
        this.monitorScript(addedScript);
        this.dependenciesUpdated = true;
    },

    /**
     * @private
     * @param removedScript
     */
    processRemovedScript: function(removedScript) {
        //TODO BRN:
    },

    /**
     * @private
     * @param {AnnotationSourceNode} addedExportAnnotationSourceNode
     */
    processAddedExportAnnotationSourceNode: function(addedExportAnnotationSourceNode) {

        //TODO BRN: Replace this with out own expression evaluator so that we don't open up security holes with the eval() statement

        var exportName = eval(addedExportAnnotationSourceNode.getArgumentExpression(0));
        var addedExportCode = new ExportCode(exportName, addedExportAnnotationSourceNode,
            addedExportAnnotationSourceNode.getOwnerDocument());
        this.addExportCode(addedExportCode);
    },

    /**
     * @private
     * @param {AnnotationSourceNode} removedExportAnnotationSourceNode
     */
    processRemovedExportAnnotationSourceNode: function(removedExportAnnotationSourceNode) {
        //TODO BRN:
    },

    /**
     * @private
     * @param {AnnotationSourceNode} addedRequireAnnotationSourceNode
     */
    processAddedRequireAnnotationSourceNode: function(addedRequireAnnotationSourceNode) {

        //TODO BRN: Replace this with out own expression evaluator so that we don't open up security holes with the eval() statement

        var requireName = eval(addedRequireAnnotationSourceNode.getArgumentExpression(0));
        var addedRequireCode = new RequireCode(requireName, addedRequireAnnotationSourceNode,
            addedRequireAnnotationSourceNode.getOwnerDocument());
        this.addRequireCode(addedRequireCode);
    },

    /**
     * @private
     * @param {AnnotationSourceNode} removedRequireAnnotationSourceNode
     */
    processRemovedRequireAnnotationSourceNode: function(removedRequireAnnotationSourceNode) {
        //TODO BRN:
    },


    //-------------------------------------------------------------------------------
    // Alert Responders
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Alert} alert
     */
    respondNodeAddedAnnotationExportAlert: function(alert) {
        var addedExportAnnotationSourceNode = alert.getData();
        this.processAddedExportAnnotationSourceNode(addedExportAnnotationSourceNode);
    },

    /**
     * @private
     * @param {Alert} alert
     */
    respondNodeAddedAnnotationRequireAlert: function(alert) {
        var addedRequireAnnotationSourceNode = alert.getData();
        this.processAddedRequireAnnotationSourceNode(addedRequireAnnotationSourceNode);
    },

    /**
     * @private
     * @param {Alert} alert
     */
    respondNodeRemovedAnnotationExportAlert: function(alert) {
        var removedExportAnnotationSourceNode = alert.getData();
        this.processRemovedExportAnnotationSourceNode(removedExportAnnotationSourceNode);
    },

    /**
     * @private
     * @param {Alert} alert
     */
    respondNodeRemovedAnnotationRequireAlert: function(alert) {
        var removedRequireAnnotationSourceNode = alert.getData();
        this.processRemovedRequireAnnotationSourceNode(removedRequireAnnotationSourceNode);
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
        this.processAddedScript(script);
    },

    /**
     * @private
     * @param {Event} event
     */
    hearApplicationScriptRemovedEvent: function(event) {
        var script = event.getData();
        this.processRemovedScript(script);
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
