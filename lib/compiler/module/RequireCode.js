//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var Obj = require('../../Obj');
var StringUtil = require('../../StringUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var RequireCode = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(requireName, requireAnnotationSourceNode, script) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {AnnotationSourceNode}
         */
        this.requireAnnotationSourceNode = requireAnnotationSourceNode;

        /**
         * @private
         * @type {string}
         */
        this.requireName = requireName;

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
    getRequireAnnotationSourceNode: function() {
        return this.requireAnnotationSourceNode;
    },

    /**
     * @return {string}
     */
    getRequireName: function() {
        return this.requireName;
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
        output += StringUtil.indent("requireName:" + this.requireName + ",");
        output += StringUtil.indent("script:" + this.script.toString());
        output += "}\n";
        return output;
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Module Require
//-------------------------------------------------------------------------------

module.exports = RequireCode;
