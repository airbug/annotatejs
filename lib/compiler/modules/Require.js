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

    _constructor: function(script, requireName, requireAnnotationNode) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {AnnotationNode}
         */
        this.requireAnnotationNode = requireAnnotationNode;

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
     * @return {AnnotationNode}
     */
    getRequireAnnotationNode: function() {
        return this.requireAnnotationNode;
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
