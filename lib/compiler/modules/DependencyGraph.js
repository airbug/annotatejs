//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var DependencyEdge = require('./DependencyEdge');
var DependencyNode = require('./DependencyNode');
var Graph = require('../../Graph');
var List = require('../../List');
var Map = require('../../Map');
var Obj = require('../../Obj');
var Set = require('../../Set');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DependencyGraph = Class.extend(Graph, {

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
         * @type {Map<string, Set<ExportCode>>}
         */
        this.exportCodeNameToExportCodeSetMap = new Map();

        // NOTE BRN: ExportCodes and RequireCodes should only be added once to this graph. Use a set to control this.
        // There is an understood one to one relationship between an ExportCode and a Script. There is also an understood
        // one to one relationship between a RequireCode and a Script

        /**
         * @private
         * @type {Set}
         */
        this.exportCodeSet = new Set();

        /**
         * @private
         * @type {Map<string, Set<RequireCode>>}
         */
        this.requireCodeNameToRequireCodeSetMap = new Map();

        /**
         * @private
         * @type {Set}
         */
        this.requireCodeSet = new Set();
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        return output;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {ExportCode} exportCode
     */
    addExportCode: function(exportCode) {

        // NOTE BRN: Make sure that this ExportCode hasn't already been added to the Graph. An ExportCode should only be
        // added once.

        if (!this.exportCodeSet.contains(exportCode)) {
            this.exportCodeSet.add(exportCode);

            var dependencyNode = this.getDependencyNodeFromExportCode(exportCode);
            if (!dependencyNode) {
                throw new Error("DependencyNode for this ExportCode's script does not exist");
            }
            dependencyNode.addExportCode(exportCode);

            var exportCodeNameExportCodeSet = this.exportCodeNameToExportCodeSetMap.get(exportCode.getExportName());
            if (!exportCodeNameExportCodeSet) {
                exportCodeNameExportCodeSet = new Set();
                this.exportCodeNameToExportCodeSetMap.put(exportCode.getExportName(), exportCodeNameExportCodeSet);
            }
            exportCodeNameExportCodeSet.add(exportCode);

            var requireCodeSet = this.requireCodeNameToRequireCodeSetMap.get(exportCode.getExportName());
            if (requireCodeSet) {
                var _this = this;
                requireCodeSet.forEach(function(requireCode) {
                    var fromDependencyNode = _this.getDependencyNodeFromRequireCode(requireCode);
                    var dependencyEdge = new DependencyEdge(fromDependencyNode, dependencyNode, requireCode, exportCode);
                    _this.addEdge(dependencyEdge);
                });
            }
        } else {
            throw new Error("ExportCodes should only be added once to the DependencyGraph");
        }
    },

    /**
     * @param {RequireCode} requireCode
     */
    addRequireCode: function(requireCode) {

        // NOTE BRN: Make sure that this RequireCode hasn't already been added to the Graph. An RequireCode should only
        // be added once.

        if (!this.requireCodeSet.contains(requireCode)) {
            this.requireCodeSet.add(requireCode);

            //TEST
            console.log(requireCode.toString());

            var dependencyNode = this.getDependencyNodeFromRequireCode(requireCode);
            if (!dependencyNode) {
                throw new Error("DependencyNode for this RequireCode's script does not exist");
            }
            dependencyNode.addRequireCode(requireCode);

            var requireCodeNameRequireCodeSet = this.requireCodeNameToRequireCodeSetMap.get(requireCode.getRequireName());
            if (!requireCodeNameRequireCodeSet) {
                requireCodeNameRequireCodeSet = new Set();
                this.requireCodeNameToRequireCodeSetMap.put(requireCode.getRequireName(), requireCodeNameRequireCodeSet);
            }
            requireCodeNameRequireCodeSet.add(requireCode);

            var exportCodeSet = this.exportCodeNameToExportCodeSetMap.get(requireCode.getRequireName());
            if (exportCodeSet) {
            var _this = this;
                exportCodeSet.forEach(function(exportCode) {
                    var toDependencyNode = _this.getDependencyNodeFromExportCode(exportCode);
                    var dependencyEdge = new DependencyEdge(dependencyNode, toDependencyNode, requireCode, exportCode);
                    _this.addEdge(dependencyEdge);
                });
            }
        } else {
            throw new Error("RequireCodes should only be added once to the DependencyGraph");
        }
    },

    /**
     * @param {Script} script
     */
    addScript: function(script) {
        var dependencyNode = new DependencyNode(script);
        this.addNode(dependencyNode);
    },

    /**
     * @param {string} exportCodeName
     * @return {List<ExportCode>}
     */
    getScriptsByExportCodeName: function(exportCodeName) {

    },

    /**
     * @param {Script} script
     * @return {List<ExportCode>}
     */
    getExportCodesByScript: function(script) {

    },

    /**
     * @return {List<Script>}
     */
    getScriptsInDependentOrder: function() {
        //TODO BRN:
    },

    removeExportCode: function(exportCode) {
        //TODO BRN:
    },

    removeRequireCode: function(requireCode) {
        //TODO BRN:
    },

    removeScript: function(script) {
        //TODO BRN:
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {ExportCode} exportCode
     * @return {DependencyNode}
     */
    getDependencyNodeFromExportCode: function(exportCode) {
        return this.getNode(exportCode.getScript());
    },

    /**
     * @private
     * @param {RequireCode} requireCode
     * @return {DependencyNode}
     */
    getDependencyNodeFromRequireCode: function(requireCode) {
        return this.getNode(requireCode.getScript());
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyGraph;
