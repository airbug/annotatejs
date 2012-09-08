//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Subscription = require('../lib/Set');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var SubscriptionTest = {
    /**
     * This tests
     * 1) unique hashcode for subscriptions
     */
    hashcodeSameFunctionAndContextDifferentTopicTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testFunction = function() {};
        var tesObject = {};

        var subscription1 = new Subscription("topic1", testFunction, tesObject);
        var subscription2 = new Subscription("topic2", testFunction, tesObject);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertNotEqual(subscription1.hashcode(), subscription2.hashcode(),
            "Assert subscribers with the same function and context but different topics return different hashcodes.");


    }).with('@Test("Hashcode of subscriptions with same function and context but different topics return different hashcodes")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SubscriptionTest;
