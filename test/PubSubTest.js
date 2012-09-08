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
        var testData = "my message";
        var testTopic = 'test topic';
        var testFunction = function(message) {
            calledVar = true;
            _test.assertEqual(this.testContextVar, testContextVar, "Assert the subscriber function was called in the subscriber context");
            _test.assertEqual(message.getTopic(), testTopic, "Assert topic received was the topic published");
            _test.assertEqual(message.getData(), testData, "Assert message received was the message published");
        };



        // Run Test
        //-------------------------------------------------------------------------------

        pubSub.subscribe(testTopic, testFunction, testContext);
        pubSub.publish(testTopic, testData);

        this.assertTrue(calledVar, "Assert subscriber function was called.");

    }).with('@Test("PubSub subscribe and publish test")')

};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = PubSubTest;
