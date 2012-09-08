/**
 * Based on the google closure library.
 * http://closure-library.googlecode.com/svn/docs/class_goog_pubsub_PubSub.html
 */


//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var List = require('./List');
var Map = require('./Map');
var Message = require('./Message');
var Subscription = require('./Subscription');


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
         * @type {Map<string, List<Subscription>>}
         */
        this.topicToSubscriptionListMap = new Map();

        /**
         * @private
         * @type {Map<string, Subscription>}
         */
        this.subscriptionHashcodeToSubscriptionMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @param {string} topic
     * @return {number}
     */
    getCount: function(topic) {
        if (this.topicToSubscriptionListMap.containsKey(topic)) {
            var subscriptionList = this.topicToSubscriptionListMap.get(topic);
            return subscriptionList.getCount();
        }
        return 0;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {string} topic
     */
    clear: function(topic) {
        this.topicToSubscriptionListMap.remove(topic);
    },

    /**
     *
     */
    clearAll: function() {
        this.topicToSubscriptionListMap.clear();
        this.topicToSubscriptionListMap = new Map();
    },

    /**
     * @param {string} topic
     * @param {*} data
     * @return {boolean}
     */
    publish: function(topic, data) {
        if (this.topicToSubscriptionListMap.containsKey(topic)) {
            var message = new Message(topic, data);
            var oneTimeDeliverySubscriptionList = new List();
            var subscriptionList = this.topicToSubscriptionListMap.get(topic);
            subscriptionList.forEach(function(subscription) {
                subscription.deliverMessage(message);
                if (subscription.isOneTimeDelivery()) {
                    oneTimeDeliverySubscriptionList.add(subscription);
                }
            });
            var _this = this;
            oneTimeDeliverySubscriptionList.forEach(function(subscription) {
                _this.removeSubscription(subscription);
            });
            return true;
        }
        return false;
    },

    /**
     * Subscribing the same subscriber to the same topic will result in that subscriber being called multiple times.
     * @param {string} topic
     * @param {function(string, *)} subscriberFunction
     * @param {Object} subscriberContext
     * @return {string}
     */
    subscribe: function(topic, subscriberFunction, subscriberContext) {
        var subscription = new Subscription(topic, subscriberFunction, subscriberContext, false);
        return this.addSubscription(subscription);
    },

    /**
     * @param {string} topic
     * @param {function(string, *)} subscriberFunction
     * @param {Object} subscriberContext
     * @return {string}
     */
    subscribeOnce: function(topic, subscriberFunction, subscriberContext) {
        var subscription = new Subscription(topic, subscriberFunction, subscriberContext, true);
        return this.addSubscription(subscription);
    },

    /**
     * @param {string} topic
     * @param {function(string, *)} subscriberFunction
     * @param {Object} subscriberContext
     * @return {boolean}
     */
    unsubscribe: function(topic, subscriberFunction, subscriberContext) {
        var subscription = new Subscription(topic, subscriberFunction, subscriberContext, true);
        return this.removeSubscription(subscription);
    },

    /**
     * @param {string} id
     * @return {boolean}
     */
    unsubscribeBySubscriberId: function(id) {
        var subscription = this.subscriptionHashcodeToSubscriptionMap.get(id);
        if (subscription) {
            return this.removeSubscription(subscription);
        }
        return false;
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Subscription} subscription
     */
    addSubscription: function(subscription) {

        // TODO BRN (QUESTION) Do we want multiple subscriptions of the same function and context to be able to
        // subscribe to a topic? If so we'd need to remove the hashcode override of the Subscription class.

        if (!this.subscriptionHashcodeToSubscriptionMap.containsKey(subscription.hashcode())) {
            var subscriptionList = this.topicToSubscriptionListMap.get(subscription.getTopic());
            if (subscriptionList === undefined) {
                subscriptionList = new List();
                this.topicToSubscriptionListMap.put(subscription.getTopic(), subscriptionList);
            }
            subscriptionList.add(subscription);
            this.subscriptionHashcodeToSubscriptionMap.put(subscription.hashcode(), subscription);
        }
        return subscription.hashcode();    
    },

    /**
     * @private
     * @param {Subscription} subscription
     */
    removeSubscription: function(subscription) {
        if (this.subscriptionHashcodeToSubscriptionMap.containsKey(subscription.hashcode())) {
            this.subscriptionHashcodeToSubscriptionMap.remove(subscription.hashcode());
            var subscriptionList = this.topicToSubscriptionListMap.get(subscription.getTopic());
            subscriptionList.remove(subscription);
            return true;
        }
        return false;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = PubSub;
