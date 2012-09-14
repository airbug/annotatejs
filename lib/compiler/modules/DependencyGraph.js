//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var Graph = require('../../Graph');
var List = require('../../List');
var Map = require('../../Map');
var Obj = require('../../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DependencyGraph = Class.extend(Obj, {

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
         * @type {Graph}
         */
        this.graph = new Graph();

        this.scriptToExportListMap = new Map();

        this.scriptToRequireListMap = new Map();

        this.exportNameToExportListMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Export} anExport
     */
    addExport: function(anExport) {
        var script = anExport.getScript();
        var exportListByScript = this.scriptToExportListMap.get(script);
        if (!exportListByScript) {
            exportListByScript = new List();
            this.scriptToExportListMap.put(script, exportListByScript);
        }
        var exportListByExportName = this.exportNameToExportListMap.get(anExport.getExportName());
        if (!exportListByExportName) {
            exportListByExportName = new List();
            this.exportNameToExportListMap.put(anExport.getExportName(), exportListByExportName);
        }
    },

    /**
     * @param {string} exportName
     * @return {List}
     */
    getExportListByName: function(exportName) {
        var exportListByExportName = this.exportNameToExportListMap.get(exportName);
        if (!exportListByExportName) {
            exportListByExportName = new List();
        }
        return exportListByExportName;
    },

    /**
     * @param {Script} script
     * @return {List<Export>}
     */
    getExportListByScript: function(script) {
        var exportListByScript = this.scriptToExportListMap.get(script);
        if (!exportListByScript) {
            exportListByScript = new List();
        }
        return exportListByScript;
    },

    getScriptListInDependentOrder: function() {

    },

    addRequire: function(require) {
        this.requireList.add(require);
    },

    addScript: function(script) {
        this.graph.addNode(script);
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
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyGraph;
