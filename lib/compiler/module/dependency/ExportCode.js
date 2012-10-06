//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../../Class');
var Obj = require('../../../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ExportCode = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(exportName, exportAnnotationSourceNode, script) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {AnnotationSourceNode}
         */
        this.exportAnnotationSourceNode = exportAnnotationSourceNode;

        /**
         * @private
         * @type {string}
         */
        this.exportName = exportName;

        /**
         * @private
         * @type {Script}
         */
        this.script = script;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {AnnotationSourceNode}
     */
    getExportAnnotationSourceNode: function() {
        return this.exportAnnotationSourceNode;
    },

    /**
     * @return {string}
     */
    getExportName: function() {
        return this.exportName;
    },

    /**
     * @return {Script}
     */
    getScript: function() {
        return this.script;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        output += "[RequireCode] {\n";
        output += "  exportName:" + this.exportName + ",\n";
        output += "  script:" + this.script.toString() + "\n";
        output += "}\n";
        return output;
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ExportCode;
