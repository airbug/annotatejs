//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var HashUtil = require('./HashUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Subscription = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(topic, subscriberFunction, subscriberContext, oneTimeDelivery) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        if (oneTimeDelivery === undefined) {
            oneTimeDelivery = false;
        }

        /**
         * @private
         * @type {boolean}
         */
        this.oneTimeDelivery = oneTimeDelivery;

        /**
         * @private
         * @type {function(string, *}}
         */
        this.subscriberFunction = subscriberFunction;

        /**
         * @private
         * @type {Object}
         */
        this.subscriberContext = subscriberContext;

        /**
         * @private
         * @type {*}
         */
        this.topic = topic;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getTopic: function() {
        return this.topic;
    },

    /**
     * @return {boolean}
     */
    isOneTimeDelivery: function() {
        return this.oneTimeDelivery;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    hashcode: function() {
        if (!this._hashcode) {
            this._hashcode = "[Subscription]" + HashUtil.hash(this.topic) + HashUtil.hash(this.subscriberFunction) +
                HashUtil.hash(this.subscriberContext);
        }
        return this._hashcode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {string} topic
     * @param {*} message
     */
    deliverMessage: function(message) {
        this.subscriberFunction.call(this.subscriberContext, this.topic, message);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Subscription;
