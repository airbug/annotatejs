//TODO BRN: This should be moved to a resources folder and consumed by the compiler which will add it in to any code it compiles

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var List = require('./List');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Annotation = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(type) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {List<*>}
         */
        this.paramList = new List();

        /**
         * @private
         * @type {*}
         */
        this.reference = null;

        /**
         * @private
         * @type {string}
         */
        this.type = type;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {*}
     */
    getReference: function() {
        return this.reference;
    },

    /**
     * @param {*} reference
     */
    setReference: function(reference) {
        this.reference = reference;
    },

    /**
     * @return {string}
     */
    getType: function() {
        return this.type;
    },

    /**
     * @return {List<*>}
     */
    getParamList: function() {
        return this.paramList;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {...*}
     */
    params: function() {
        for (var i = 0, size = arguments.length; i < size; i++) {
            var param = arguments[i];
            this.paramList.add(param);
        }
        return this;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Annotation;
