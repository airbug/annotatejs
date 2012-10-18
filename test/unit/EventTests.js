//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var Event = require('../../lib/Event');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) Instantiation of a new Event
 * 2) That the "target" value is null after instantiation since the target is set when the event is dispatched
 */
var eventInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testType = "testEventType";
        this.testData = "testEventData";
        this.event = new Event(this.testType, this.testData);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.event.getBubbles(), true,
            "Assert event bubbles by default after instantiation");
        test.assertEqual(this.event.getData(), this.testData,
            "Assert event data was set correctly during instantiation");
        test.assertEqual(this.event.isPropagationStopped(), false,
            "Assert propagation is not stopped by default");
        test.assertEqual(this.event.getTarget(), undefined,
            "Assert target is undefined after instantiation");
        test.assertEqual(this.event.getType(), this.testType,
            "Assert event type was set correctly during instantiation");
    }
};
annotate(eventInstantiationTest).with(
    annotation("Test").params("Event instantiation test")
);
