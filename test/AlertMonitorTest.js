//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var AlertMonitor = require('../lib/AlertMonitor');
var Class = require('../lib/Class');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var AlertMonitorTest = {

    /**
     * This tests
     * 1) Instantiating an AlertMonitor
     * 2) That an AlertMonitor instanced doesExtend AlertMonitor
     * 3) That the monitor target is set to the value passed in during instantiation
     */
    alertMonitorInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testTarget = {};
        var alertMonitor = new AlertMonitor(testTarget);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(alertMonitor, AlertMonitor),
            "Assert new instance does extend AlertMonitor");
        this.assertEqual(alertMonitor.getTarget(), testTarget,
            "Assert AlertMonitor target is set to the target passed in during instantiation");


    }).with('@Test("AlertMonitor instantiation test")'),

    /**
     * This tests
     * 1) Adding a responder to an AlertMonitor
     * 2) Firing an alertResponse
     */
    alertMonitorAddResponderAlertResponseTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testTarget = {};
        var alertMonitor = new AlertMonitor(testTarget);
        var testAlertType = "testAlertType";
        var testAlertKey = "";
        var testAlertData = "testAlertData";

        var calledVar = false;
        var testContextVar = "some value";
        var _test = this;
        var testResponderFunction = function(alert) {
            calledVar = true;
            _test.assertEqual(this.testContextVar, testContextVar,
                "Assert the responder function was called in the responder context");
            _test.assertEqual(alert.getData(), testAlertData,
                "Assert alert data received was the alert data sent");
            _test.assertEqual(alert.getKey(), testAlertKey,
                "Assert alert key received was the alert key sent");
            _test.assertEqual(alert.getTarget(), testTarget,
                "Assert alert target is the target that was set for the AlertMonitor");
            _test.assertEqual(alert.getType(), testAlertType,
                "Assert alert type received was the alert type published");
        };
        var testResponderContext = {
            testContextVar: testContextVar
        };


        // Run Test
        //-------------------------------------------------------------------------------

        alertMonitor.addResponder(testAlertType, testAlertKey, testResponderFunction, testResponderContext);
        alertMonitor.alertResponse(testAlertType, testAlertKey, testAlertData);
        this.assertTrue(calledVar, "Assert responder function was called.");

    }).with('@Test("AlertMonitor addResponder/alertResponse test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AlertMonitorTest;
