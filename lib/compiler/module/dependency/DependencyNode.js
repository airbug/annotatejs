/**
 * TODO BRN: The value of this node is the Script. However, this node also contains all of the exports and requires
 * that the script contains. There can be duplicates of both requires and exports (these situations are errors, but
 * they can still exist in the code base, thus the DependencyGraph must be able to handle those situations)
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../../Class');
var GraphNode = require('../../../GraphNode');
var Set = require('../../../Set');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DependencyNode = Class.extend(GraphNode, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(value) {

        this._super(value);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {ExportCode}
         */
        this.exportCode = undefined;

        /**
         * @private
         * @type {Set<RequireCode>}
         */
        this.requireCodeSet = new Set();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {ExportCode}
     */
    getExportCode: function() {
        return this.exportCode;
    },

    /**
     * @param {ExportCode} exportCode
     */
    setExportCode: function(exportCode) {
        this.exportCode = exportCode;
    },

    /**
     * @return {Set<RequireCode>}
     */
    getRequireCodeSet: function() {
        return this.requireCodeSet;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        output += "{\n";
        output += "  script:" + this.value.toString() + "\n";
        output += "  script:" + this.value.toString() + "\n";
        output += "}\n";
        return output;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {RequireCode} requireCode
     */
    addRequireCode: function(requireCode) {
        this.requireCodeSet.add(requireCode);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyNode;
