//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var EventDispatcher = require('../../lib/EventDispatcher');
var Event = require('../../lib/Event');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var EventDispatcherTests = {

    /**
     * This tests
     * 1) Instantiating an EventDispatcher
     * 2) That the dispatcher target is set to itself if no target is passed in during instantiation
     * 3) That the dispatcher target is set to the value passed in during instantiation
     */
    eventDispatcherInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var eventDispatcherWithoutTarget = new EventDispatcher();
        var testTarget = {};
        var eventDispatcherWithTarget = new EventDispatcher(testTarget);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(eventDispatcherWithoutTarget.getParentDispatcher(), undefined,
            "Assert parent dispatcher defaults to undefined");
        this.assertEqual(eventDispatcherWithoutTarget.getTarget(), eventDispatcherWithoutTarget,
            "Assert dispatcher target is set to itself if no target is passed in during instantiation");
        this.assertEqual(eventDispatcherWithTarget.getTarget(), testTarget,
            "Assert dispatcher target is set to the target passed in during instantiation");


    }).with('@Test("EventDispatcher instantiation test")'),


    /**
     * This tests
     * 1) Adding and event listener
     * 2) Dispatching a simple event
     */
    eventDispatcherSimpleAddEventListenerDispatchEventTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var eventDispatcher = new EventDispatcher();
        var testEventType = "testEventType";
        var testEventData = "testEventData";
        var testEvent = new Event(testEventType, testEventData);

        var calledVar = false;
        var testContextVar = "some value";
        var _test = this;
        var testListenerFunction = function(event) {
            calledVar = true;
            _test.assertEqual(this.testContextVar, testContextVar,
                "Assert the listener function was called in the listener context");
            _test.assertEqual(event.getType(), testEventType,
                "Assert event type received was the event type published");
            _test.assertEqual(event.getData(), testEventData,
                "Assert event data received was the event data published");
            _test.assertEqual(event.getTarget(), eventDispatcher,
                "Assert event target is the dispatcher that dispatched the event");
        };
        var testListenerContext = {
            testContextVar: testContextVar
        };


        // Run Test
        //-------------------------------------------------------------------------------

        eventDispatcher.addEventListener(testEventType, testListenerFunction, testListenerContext);
        eventDispatcher.dispatchEvent(testEvent);
        this.assertTrue(calledVar, "Assert listener function was called.");

    }).with('@Test("EventDispatcher simple add event listener and dispatch event test")'),

    /**
     * This tests
     * 1) Adding an anonymous event listener
     * 2) Dispatching a simple event with anonymous listeners
     */
    eventDispatcherAddAnonymousEventListenerDispatchEventTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var eventDispatcher = new EventDispatcher();
        var testEventType = "testEventType";
        var testEventData = "testEventData";
        var testEvent = new Event(testEventType, testEventData);

        var calledVar = false;
        var _test = this;
        var testListenerFunction = function(event) {
            calledVar = true;
            _test.assertEqual(event.getType(), testEventType,
                "Assert event type received was the event type published");
            _test.assertEqual(event.getData(), testEventData,
                "Assert event data received was the event data published");
            _test.assertEqual(event.getTarget(), eventDispatcher,
                "Assert event target is the dispatcher that dispatched the event");
        };


        // Run Test
        //-------------------------------------------------------------------------------

        eventDispatcher.addEventListener(testEventType, testListenerFunction);
        eventDispatcher.dispatchEvent(testEvent);
        this.assertTrue(calledVar, "Assert listener function was called.");

    }).with('@Test("EventDispatcher add anonymous event listener and dispatch event test")'),

    /**
     * This tests
     * 1) That an event does not bubble when bubbles is false on dispatchEvent
     */
    eventDispatcherDispatchEventBubblesFalseTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testChildEventDispatcher = new EventDispatcher();
        var testParentEventDispatcher = new EventDispatcher();
        var testEventType = "testEventType";
        var testEventData = "testEventData";
        var testEvent = new Event(testEventType, testEventData);
        var testBubbles = false;
        var childCalledVar = false;
        var testChildListenerFunction = function(event) {
            childCalledVar = true;
        };
        var parentCalledVar = false;
        var testParentListenerFunction = function(event) {
            parentCalledVar = true;
        };


        // Run Test
        //-------------------------------------------------------------------------------

        testChildEventDispatcher.setParentDispatcher(testParentEventDispatcher);
        testChildEventDispatcher.addEventListener(testEventType, testChildListenerFunction);
        testParentEventDispatcher.addEventListener(testEventType, testParentListenerFunction);
        testChildEventDispatcher.dispatchEvent(testEvent, testBubbles);
        this.assertTrue(childCalledVar,
            "Assert listener function on child dispatcher was called when bubbles is false.");
        this.assertFalse(parentCalledVar,
            "Assert listener function on parent dispatcher was not called when bubbles is false.");

    }).with('@Test("EventDispatcher dispatch event with bubbles false test")'),

    /**
     * This tests
     * 1) That an event does bubble when bubbles is true on dispatchEvent
     */
    eventDispatcherDispatchEventBubblesTrueTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testChildEventDispatcher = new EventDispatcher();
        var testParentEventDispatcher = new EventDispatcher();
        var testEventType = "testEventType";
        var testEventData = "testEventData";
        var testEvent = new Event(testEventType, testEventData);
        var testBubbles = true;
        var childCalledVar = false;
        var testChildListenerFunction = function(event) {
            childCalledVar = true;
        };
        var parentCalledVar = false;
        var testParentListenerFunction = function(event) {
            parentCalledVar = true;
        };


        // Run Test
        //-------------------------------------------------------------------------------

        testChildEventDispatcher.setParentDispatcher(testParentEventDispatcher);
        testChildEventDispatcher.addEventListener(testEventType, testChildListenerFunction);
        testParentEventDispatcher.addEventListener(testEventType, testParentListenerFunction);
        testChildEventDispatcher.dispatchEvent(testEvent, testBubbles);
        this.assertTrue(childCalledVar,
            "Assert listener function on child dispatcher was called when bubbles is true.");
        this.assertTrue(parentCalledVar,
            "Assert listener function on parent dispatcher was called when bubbles is true.");

    }).with('@Test("EventDispatcher dispatch event with bubbles true test")'),

    /**
     * This tests
     * 1) That an event does not bubble on dispatchEvent when stopPropagation is called
     */
    eventDispatcherDispatchEventStopPropagationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testChildEventDispatcher = new EventDispatcher();
        var testParentEventDispatcher = new EventDispatcher();
        var testEventType = "testEventType";
        var testEventData = "testEventData";
        var testEvent = new Event(testEventType, testEventData);
        var testBubbles = true;
        var childCalledVar = false;
        var testChildListenerFunction = function(event) {
            childCalledVar = true;
            event.stopPropagation();
        };
        var parentCalledVar = false;
        var testParentListenerFunction = function(event) {
            parentCalledVar = true;
        };


        // Run Test
        //-------------------------------------------------------------------------------

        testChildEventDispatcher.setParentDispatcher(testParentEventDispatcher);
        testChildEventDispatcher.addEventListener(testEventType, testChildListenerFunction);
        testParentEventDispatcher.addEventListener(testEventType, testParentListenerFunction);
        testChildEventDispatcher.dispatchEvent(testEvent, testBubbles);
        this.assertTrue(childCalledVar,
            "Assert listener function on child dispatcher was called");
        this.assertFalse(parentCalledVar,
            "Assert listener function on parent dispatcher was not called when stopPropagation was called on a child " +
                "EventDispatcher");

    }).with('@Test("EventDispatcher dispatch event stopPropagation test")')

};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = EventDispatcherTests;
