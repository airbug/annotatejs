/**
 * Based on the google closure library.
 * http://closure-library.googlecode.com/svn/docs/class_goog_pubsub_PubSub.html
 */


//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Map = require('./Map');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var PubSub = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Map}
         */
        this.subscriptionMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @param {string} topic
     * @return {number}
     */
    getCount: function(topic) {

    },

    /**
     * @return {number}
     */
    getCountAll: function() {

    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     *
     */
    clear: function(topic) {

    },

    /**
     *
     */
    clearAll: function() {

    },

    /**
     * @param {string} topic
     * @param {*} message
     * @return {boolean}
     */
    publish: function(topic, message) {

    },

    /**
     * Subscribing the same subscriber to the same topic will result in that subscriber being called multiple times.
     * @param {string} topic
     * @param {function(string, *)} subscriberFunction
     * @param {Object} subscriberContext
     * @return {string}
     */
    subscribe: function(topic, subscriberFunction, subscriberContext) {
        //Create a
    },

    /**
     * @param {string} topic
     * @param {function(string, *)} subscriberFunction
     * @param {Object} subscriberContext
     * @return {string}
     */
    subscribeOnce: function(topic, subscriberFunction, subscriberContext) {

    },

    /**
     * @param {string} topic
     * @param {function(string, *)} subscriberFunction
     * @param {Object} subscriberContext
     * @return {boolean}
     */
    unsubscribe: function(topic, subscriberFunction, subscriberContext) {

    },

    /**
     * @param {string} id
     * @return {boolean}
     */
    unsubscribeBySubscriberId: function(id) {

    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = PubSub;
