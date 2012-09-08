//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var PubSub = require('../lib/PubSub');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var PubSubTest = {
    /**
     * This tests
     * 1) Subscribing to a topic.
     */
    pubSubSubscribePublishTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var pubSub = new PubSub();
        var calledVar = false;
        var testContextVar = "some value";
        var _test = this;
        var testContext = {
            testContextVar: testContextVar
        };
        var testMessage = "my message";
        var testTopic = 'test topic';
        var testFunction = function(topic, message) {
            calledVar = true;
            _test.assertEqual(this.testContextVar, testContextVar, "Assert the subscriber function was called in the subscriber context");
            _test.assertEqual(topic, testTopic, "Assert topic received was the topic published");
            _test.assertEqual(message, testMessage, "Assert message received was the message published");
        };



        // Run Test
        //-------------------------------------------------------------------------------

        pubSub.subscribe(testTopic, testFunction, testContext);
        pubSub.publish(testTopic, testMessage);

        this.assertTrue(calledVar, "Assert subscriber function was called.");

    }).with('@Test("PubSub subscribe and publish test")')

};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = PubSubTest;
