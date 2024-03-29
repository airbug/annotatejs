//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var Publisher = require('../../lib/Publisher');
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
 * 1) Subscribing to a topic.
 */
var publisherSubscribePublishTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.publisher = new Publisher();
        this.calledVar = false;
        this.testContextVar = "some value";
        this.testContext = {
            testContextVar: this.testContextVar
        };
        this.testData = "my message";
        this.testTopic = 'test topic';
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        var _this = this;
        this.testFunction = function(message) {
            _this.calledVar = true;
            test.assertEqual(this.testContextVar, _this.testContextVar,
                "Assert the subscriber function was called in the subscriber context");
            test.assertEqual(message.getTopic(), _this.testTopic,
                "Assert message topic received was the message topic published");
            test.assertEqual(message.getData(), _this.testData,
                "Assert message data received was the message data published");
        };
        this.publisher.subscribe(this.testTopic, this.testFunction, this.testContext);
        this.publisher.publish(this.testTopic, this.testData);
        test.assertTrue(this.calledVar, "Assert subscriber function was called.");
    }
};
annotate(publisherSubscribePublishTest).with(
    test().name("Publisher subscribe and publish test")
);
