
//NOTE BRN: The edges in this graph need to include the two dependencyNodes AND the export and require that they
// represent. This gives us the ability to map between nodes multiple times if there's multiple exports of different
// names on a single node or if there are multiple requires requiring the same name.. and several other cases.

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../../Class');
var GraphEdge = require('../../../GraphEdge');
var Obj = require('../../../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var DependencyEdge = Class.extend(GraphEdge, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(fromNode, toNode, requireCode, exportCode) {

        this._super(fromNode, toNode);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {ExportCode}
         */
        this.exportCode = exportCode;

        /**
         * @private
         * @type {RequireCode}
         */
        this.requireCode = requireCode;
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
     * @return {RequireCode}
     */
    getRequireCode: function() {
        return this.requireCode;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @override
     * @param {*} value
     * @return {boolean}
     */
    equals: function(value) {
        if (Class.doesExtend(value, GraphEdge)) {
            return (Obj.equals(value.getFromNode(), this.getFromNode()) && Obj.equals(value.getToNode(), this.getToNode())
                && Obj.equals(value.getExportCode(), this.getExportCode()) && Obj.equals(value.getRequireCode(), this.getRequireCode()));
        }
        return false;
    },

    /**
     * @override
     * @return {number}
     */
    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = Obj.hashCode("[GraphEdge]" + Obj.hashCode(this.getFromNode()) + "_" + Obj.hashCode(this.getToNode()) +
                "_" + Obj.hashCode(this.getExportCode()) + "_" + Obj.hashCode(this.getRequireCode()));
        }
        return this._hashCode;
    },

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        output += "{\n";

        output += "}\n";
        return output;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyEdge;
