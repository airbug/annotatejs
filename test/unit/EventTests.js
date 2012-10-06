//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var Event = require('../../lib/Event');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var EventTests = {

    /**
     * This tests
     * 1) Instantiation of a new Event
     * 2) That the "target" value is null after instantiation since the target is set when the event is dispatched
     */
    eventInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testType = "testEventType";
        var testData = "testEventData";
        var event = new Event(testType, testData);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(event.getBubbles(), true,
            "Assert event bubbles by default after instantiation");
        this.assertEqual(event.getData(), testData,
            "Assert event data was set correctly during instantiation");
        this.assertEqual(event.isPropagationStopped(), false,
            "Assert propagation is not stopped by default");
        this.assertEqual(event.getTarget(), undefined,
            "Assert target is undefined after instantiation");
        this.assertEqual(event.getType(), testType,
            "Assert event type was set correctly during instantiation");

    }).with('@Test("Event instantiation test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = EventTests;
