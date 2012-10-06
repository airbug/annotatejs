//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../../Class');
var DependencyEdge = require('./DependencyEdge');
var DependencyNode = require('./DependencyNode');
var Graph = require('../../../Graph');
var List = require('../../../List');
var Map = require('../../../Map');
var Obj = require('../../../Obj');
var Set = require('../../../Set');


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
         * @type {Map<string, ExportCode>}
         */
        this.exportCodeNameToExportCodeMap = new Map();

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

        var dependencyNode = this.getDependencyNodeFromExportCode(exportCode);

        if (this.exportCodeSet.contains(exportCode)) {
            throw new Error("ExportCodes should only be added once to the DependencyGraph");
        }
        if (this.exportCodeNameToExportCodeMap.containsKey(exportCode.getExportName())) {
            throw new Error("There is already an ExportCode using the name '" + exportCode.getExportName() + "'");
        }
        if (!dependencyNode) {
            throw new Error("DependencyNode for this ExportCode's script does not exist");
        }
        if (dependencyNode.getExportCode() !== undefined) {
            throw new Error("DependencyNode already has an ExportCode");
        }

        this.exportCodeSet.add(exportCode);
        dependencyNode.setExportCode(exportCode);
        this.exportCodeNameToExportCodeMap.put(exportCode.getExportName(), exportCode);

        var requireCodeSet = this.requireCodeNameToRequireCodeSetMap.get(exportCode.getExportName());
        if (requireCodeSet) {
            var _this = this;
            requireCodeSet.forEach(function(requireCode) {
                var fromDependencyNode = _this.getDependencyNodeFromRequireCode(requireCode);
                var dependencyEdge = new DependencyEdge(fromDependencyNode, dependencyNode, requireCode, exportCode);
                _this.addEdge(dependencyEdge);
            });
        }
    },

    /**
     * @param {RequireCode} requireCode
     */
    addRequireCode: function(requireCode) {

        // NOTE BRN: Make sure that this RequireCode hasn't already been added to the Graph. A RequireCode should only
        // be added once.

        if (!this.requireCodeSet.contains(requireCode)) {
            this.requireCodeSet.add(requireCode);

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

            var exportCode = this.exportCodeNameToExportCodeMap.get(requireCode.getRequireName());
            if (exportCode) {
                var toDependencyNode = this.getDependencyNodeFromExportCode(exportCode);
                var dependencyEdge = new DependencyEdge(dependencyNode, toDependencyNode, requireCode, exportCode);
                this.addEdge(dependencyEdge);
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

        // TODO BRN: Add support for require annotations that specify a file by path. Look for requires that require
        // this script by path.
        // Also, we need to decide what characters we want to support for export names. If the '/' character is supported
        // for export names, then we will have cases where someone could declare an export name that is the path of some
        // other export. So we would have to handle that case and decide which one wins.
    },

    /**
     * @param script
     * @return {?string} Returns undefined if the graph does not contain the script or if the script has not had an ExportCode added to it
     */
    getScriptExportName: function(script) {
        var dependencyNode = this.getNode(script);
        if (dependencyNode) {
            return dependencyNode.getExportCode().getExportName();
        }
        return undefined;
    },

    /**
     * @return {List<Script>}
     */
    getScriptsInDependentOrder: function() {
        var _this = this;
        var processedNodeSet = new Set();
        var scriptsInDependentOrderList = new List();
        this.nodeSet.forEach(function(dependencyNode) {
            _this.processDependentOrder(dependencyNode, processedNodeSet, scriptsInDependentOrderList);
        });
        return scriptsInDependentOrderList;
    },

    /**
     * @param {Script} script
     * @return {List<Script>}
     */
    getRequiredScriptsOfScript: function(script) {
        var scriptList = new List();
        var dependencyNode = this.getNode(script);
        var requiredNodeSet = this.getNodesFrom(dependencyNode);
        requiredNodeSet.forEach(function(requiredNode) {
            scriptList.add(requiredNode.getValue());
        });
        return scriptList;
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
    },

    /**
     * @param {DependencyNode} dependencyNode
     * @param {Set<DependencyNode>} processedNodeSet
     * @param {List<Script>} scriptsInDependentOrderList
     */
    processDependentOrder: function(dependencyNode, processedNodeSet, scriptsInDependentOrderList) {
        var currentNodePathSet = new Set();
        this.processDependentOrderRecursive(dependencyNode, processedNodeSet, scriptsInDependentOrderList, currentNodePathSet);
    },

    /**
     * @param {DependencyNode} dependencyNode
     * @param {Set<DependencyNode>} processedNodeSet
     * @param {List<Script>} scriptsInDependentOrderList
     * @param {Set<DependencyNode>} visitedNodeSet
     */
    processDependentOrderRecursive: function(dependencyNode, processedNodeSet, scriptsInDependentOrderList, currentNodePathSet) {

        var _this = this;
        // TODO BRN: We can find the chain of the circular dependency by trickling back out of the recursive stack.
        if (currentNodePathSet.contains(dependencyNode)) {
            throw new Error("Cannot compute dependency order. Circular reference found. This should have been caught earlier.");
        } else {
            currentNodePathSet.add(dependencyNode);
        }

        if (!processedNodeSet.contains(dependencyNode)) {
            nodeFromSet = this.getNodesFrom(dependencyNode);
            nodeFromSet.forEach(function(nodeFrom) {
                _this.processDependentOrderRecursive(nodeFrom, processedNodeSet, scriptsInDependentOrderList, currentNodePathSet);
            });
            scriptsInDependentOrderList.add(dependencyNode.getValue());
            processedNodeSet.add(dependencyNode);
        }

        // NOTE BRN: We remove this node from the visited node set. Otherwise we will think this is a circular
        // reference when A -> B, A -> C, B -> C since through A we have already visited C and then we

        currentNodePathSet.remove(dependencyNode);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyGraph;
