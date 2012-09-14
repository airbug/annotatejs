//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotationNode = require('../nodes/AnnotationNode');
var Class = require('../../Class');
var Event = require('../../Event');
var EventDispatcher = require('../../EventDispatcher');
var Export = require('./Export');
var Map = require('../../Map');
var Require = require('./Require');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ScriptDependencyMonitor = Class.extend(EventDispatcher, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(script) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        // NOTE BRN: When the user is in the midst of writing code, there is nothing stopping them from including more
        // than one export annotation. Although this is considered an error, we still want to track this annotation
        // so that we know where to find it if the user modifies or removes an annotation.

        /**
         * @private
         * @type {Map<AnnotationNode, Export>}
         */
        this.exportAnnotationNodeToExportMap = new Map();


        /**
         * @private
         * @type {boolean}
         */
        this.monitoring = false;

        /**
         * @private
         * @type {Map<AnnotationNode, Require>}
         */
        this.requireAnnotationNodeToRequireMap = new Map();

        /**
         * @private
         * @type {Script}
         */
        this.script = script;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    firstTimeProcess: function() {
        var sourceTree = this.script.getSourceTree();
        var _this = this;
        sourceTree.walk(function(sourceNode) {
            if (Class.doesExtend(sourceNode, AnnotationNode)) {
                if (sourceNode.getName() === 'require') {
                    this.processNewRequireAnnotationNode(sourceNode);
                } else if (sourceNode.getName() === 'export') {
                    this.processNewExportAnnotationNode(sourceNode);
                }
            }
        });
    },

    /**
     * @param {AnnotationNode} exportAnnotationNode
     */
    processNewExportAnnotationNode: function(exportAnnotationNode) {
        
        //TODO BRN: Replace this with out own expression evaluator so that we don't open up security holes with the eval() statement

        var exportName = eval(exportAnnotationNode.getArgumentExpression(0));
        var newExport = new Export(exportName, exportAnnotationNode, this.script);
        this.exportAnnotationNodeToExportMap.put(exportAnnotationNode, newExport);
        this.dispatchEvent(new Event(ScriptDependencyMonitor.EventTypes.ADD_EXPORT, newExport));
    },
    
    /**
     * @param {AnnotationNode} requireAnnotationNode
     */
    processNewRequireAnnotationNode: function(requireAnnotationNode) {

        //TODO BRN: Replace this with out own expression evaluator so that we don't open up security holes with the eval() statement

        var requireName = eval(requireAnnotationNode.getArgumentExpression(0));
        var newRequire = new Require(requireName, requireAnnotationNode, this.script);
        this.requireAnnotationNodeToRequireMap.put(requireAnnotationNode, newRequire);
        this.dispatchEvent(new Event(ScriptDependencyMonitor.EventTypes.ADD_REQUIRE, newRequire));
    },
    
    /**
     *
     */
    startMonitoring: function() {
        if (!this.monitoring) {
            this.monitoring = true;
            this.firstTimeProcess();
        }
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

ScriptDependencyMonitor.EventTypes = {
    EXPORT_ADDED: "ScriptDependencyMonitor:ExportAdded",
    REQUIRE_ADDED: "ScriptDependencyMonitor:RequireAdded"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ScriptDependencyMonitor;
