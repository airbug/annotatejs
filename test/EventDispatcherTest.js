//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var EventDispatcher = require('../lib/EventDispatcher');
var Event = require('../lib/Event');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var EventDispatcherTest = {

    /**
     * This tests
     * 1) Instantiating an EventDispatcher
     * 2) That the dispatcher target is set to itself if no target is passed in during instantiation
     * 3) That the dispatcher target is set to the value passed in during instantiation
     */
    instantiateEventDispatcherTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var eventDispatcherWithoutTarget = new EventDispatcher();
        var testTarget = {};
        var eventDispatcherWithTarget = new EventDispatcher(testTarget);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(eventDispatcherWithoutTarget.getTarget(), eventDispatcherWithoutTarget,
            "Assert dispatcher target is set to itself if no target is passed in during instantiation");
        this.assertEqual(eventDispatcherWithTarget.getTarget(), testTarget,
            "Assert dispatcher target is set to the target passed in during instantiation");


    }).with('@Test("Instantiate an EventDispatcher test")'),


    /**
     * This tests
     * 1) Adding and event listener
     * 2) Dispatching a simple event
     */
    simpleAddEventListenerDispatchEventTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var eventDispatcher = new EventDispatcher();



        // Run Test
        //-------------------------------------------------------------------------------



    }).with('@Test("Simple add event listener and dispatch event test")')

};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = EventDispatcherTest;
