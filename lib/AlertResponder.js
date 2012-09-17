//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AlertResponder = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(responderFunction, responderContext) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {function(*)}
         */
        this.responderFunction = responderFunction;

        /**
         * @private
         * @type {Object}
         */
        this.responderContext = responderContext;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    equals: function(value) {
        if (Class.doesExtend(value, AlertResponder)) {
            return (value.responderFunction === this.responderFunction && value.responderContext === this.responderContext);
        }
        return false;
    },

    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = Obj.hashCode("[AlertResponder]" + Obj.hashCode(this.responderFunction) + "_" + Obj.hashCode(this.responderContext));
        }
        return this._hashCode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Alert} alert
     */
    respond: function(alert) {
        this.responderFunction.call(this.responderContext, alert);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AlertResponder;
