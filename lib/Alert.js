//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Alert = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(type, key, target, data) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {*}
         */
        this.data = data;

        /**
         * @private
         * @type {string}
         */
        this.key = key;

        /**
         * @private
         * @type {Object}
         */
        this.target = target;

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
    getData: function() {
        return this.data;
    },

    /**
     * @private
     * @return {string}
     */
    getKey: function() {
        return this.key;
    },

    /**
     * @return {Object}
     */
    getTarget: function() {
        return this.target;
    },

    /**
     * @return {string}
     */
    getType: function() {
        return this.type;
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Alert;
