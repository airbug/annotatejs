//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Class = require('../lib/Class');
var EventListener = require('../lib/EventListener');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var EventListenerTest = {

    /**
     * This tests
     * 1) Instantiation of a new EventListener
     */
    eventListenerInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testListenerFunction = function(event) {};
        var testListenerContext = {};
        var eventListener = new EventListener(testListenerFunction, testListenerContext);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(eventListener, EventListener),
            "Assert EventListener instance extends EventListener ");

    }).with('@Test("EventListener instantiation test")'),

    /**
     * This tests
     * 1) That EventListeners with the same function and context are equal
     * 2) That EventListeners with the same function but different contexts are not equal
     * 3) That EventListeners with different functions but the same context are not equal
     * 4) That EventListeners with different functions and different contexts are not equal
     */
    eventListenerEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testListenerFunction1 = function(event) {};
        var testListenerContext1 = {};
        var testListenerFunction2 = function(event) {};
        var testListenerContext2 = {};

        var equalEventListener1 = new EventListener(testListenerFunction1, testListenerContext1);
        var equalEventListener2 = new EventListener(testListenerFunction1, testListenerContext1);

        var notEqualEventListener1 = new EventListener(testListenerFunction1, testListenerContext1);
        var notEqualEventListener2 = new EventListener(testListenerFunction1, testListenerContext2);
        var notEqualEventListener3 = new EventListener(testListenerFunction2, testListenerContext1);
        var notEqualEventListener4 = new EventListener(testListenerFunction2, testListenerContext2);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(equalEventListener1, equalEventListener2,
            "Assert EventListeners with the same function and context are equal");
        this.assertNotEqual(notEqualEventListener1, notEqualEventListener2,
            "Assert EventListeners with the same function but different contexts are not equal.");
        this.assertNotEqual(notEqualEventListener1, notEqualEventListener3,
            "Assert EventListeners with different functions but the same context are not equal.");
        this.assertNotEqual(notEqualEventListener1, notEqualEventListener4,
            "Assert EventListeners with different functions and different contexts are not equal.");

    }).with('@Test("EventListener equality test")'),

    /**
     * This tests
     * 1) That EventListeners with the same function and context have the same hash code
     */
    eventListenerHashCodeEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testListenerFunction = function(event) {};
        var testListenerContext = {};
        var eventListener1 = new EventListener(testListenerFunction, testListenerContext);
        var eventListener2 = new EventListener(testListenerFunction, testListenerContext);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(eventListener1.hashCode(), eventListener2.hashCode(),
            "Assert EventListeners with the same function and context have equal hash codes");


    }).with('@Test("EventListener hash code equality test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = EventListenerTest;


//TODO BRN: Add a hearEvent test