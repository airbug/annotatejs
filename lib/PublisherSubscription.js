//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var HashUtil = require('./HashUtil');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var PublisherSubscription = Class.extend(Obj, {

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
     * @return {number}
     */
    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = Obj.hashCode("[PublisherSubscription]" + Obj.hashCode(this.topic) + Obj.hashCode(this.subscriberFunction) +
                Obj.hashCode(this.subscriberContext));
        }
        return this._hashCode;
    },

    equals: function(value) {
        if (Class.doesExtend(value, PublisherSubscription)) {
            return (Obj.equals(this.topic, value.topic) &&
                Obj.equals(this.subscriberFunction, value.subscriberFunction) &&
                Obj.equals(this.subscriberContext, value.subscriberContext));
        }
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Message} message
     */
    deliverMessage: function(message) {
        this.subscriberFunction.call(this.subscriberContext, message);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = PublisherSubscription;
