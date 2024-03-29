//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var PublisherSubscription = require('../../lib/PublisherSubscription');
var TestAnnotation = require('../../lib/unit/TestAnnotation');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var test = TestAnnotation.test;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) That subscriptions with the same function and context but different topics are not equal
 * 2) That subscriptions with the same function, context, and topic are equal
 */
var subscriptionEqualityTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        var testFunction = function() {};
        var tesObject = {};
        var testTopic1 = "topic1";
        var testTopic2 = "topic2";
        this.notEqualPublisherSubscription1 = new PublisherSubscription(testTopic1, testFunction, tesObject);
        this.notEqualPublisherSubscription2 = new PublisherSubscription(testTopic2, testFunction, tesObject);
        this.equalPublisherSubscription1 = new PublisherSubscription(testTopic1, testFunction, tesObject);
        this.equalPublisherSubscription2 = new PublisherSubscription(testTopic1, testFunction, tesObject);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertNotEqual(this.notEqualPublisherSubscription1, this.notEqualPublisherSubscription2,
            "Assert subscriptions with the same function and context but different topics are not equal.");
        test.assertEqual(this.equalPublisherSubscription1, this.equalPublisherSubscription2,
            "Assert subscriptions with the same function, context, and topic are equal");
    }
};
annotate(subscriptionEqualityTest).with(
    test().name("Subscription equality test")
);


/**
 * This tests
 * 1) That subscriptions with the same function, context, and topic have the same hash code
 */
var subscriptionHashCodeEqualityTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        var testFunction = function() {};
        var tesObject = {};
        var testTopic = "topic1";
        this.publisherSubscription1 = new PublisherSubscription(testTopic, testFunction, tesObject);
        this.publisherSubscription2 = new PublisherSubscription(testTopic, testFunction, tesObject);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.publisherSubscription1.hashCode(), this.publisherSubscription2.hashCode(),
            "Assert subscriptions with the same function, context, and topic have equal hash codes");
    }
};
annotate(subscriptionHashCodeEqualityTest).with(
    test().name("Subscription hash code equality test")
);
