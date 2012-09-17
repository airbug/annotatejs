//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var Obj = require('../../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Require = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(script, requireName, requireAnnotationSourceNode) {

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
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Module Require
//-------------------------------------------------------------------------------

module.requires = Require;
