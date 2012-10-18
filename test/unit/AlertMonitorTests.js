//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var AlertMonitor = require('../../lib/AlertMonitor');
var Class = require('../../lib/Class');


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
 * 1) Instantiating an AlertMonitor
 * 2) That an AlertMonitor instanced doesExtend AlertMonitor
 * 3) That the monitor target is set to the value passed in during instantiation
 */
var alertMonitorInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testTarget = {};
        this.alertMonitor = new AlertMonitor(this.testTarget);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.alertMonitor, AlertMonitor),
            "Assert new instance does extend AlertMonitor");
        test.assertEqual(this.alertMonitor.getTarget(), this.testTarget,
            "Assert AlertMonitor target is set to the target passed in during instantiation");
    }
};
annotate(alertMonitorInstantiationTest).with(
    annotation("Test").params("AlertMonitor instantiation test")
);

/**
 * This tests
 * 1) Adding a responder to an AlertMonitor
 * 2) Firing an alertResponse
 */
var alertMonitorAddResponderAlertResponseTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testTarget = {};
        this.alertMonitor = new AlertMonitor(this.testTarget);
        this.testAlertType = "testAlertType";
        this.testAlertKey = "";
        this.testAlertData = "testAlertData";
        this.calledVar = false;
        this.testContextVar = "some value";
        this.testResponderContext = {
            testContextVar: this.testContextVar
        };
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        var _this = this
        this.testResponderFunction = function(alert) {
            _this.calledVar = true;
            test.assertEqual(this.testContextVar, _this.testContextVar,
                "Assert the responder function was called in the responder context");
            test.assertEqual(alert.getData(), _this.testAlertData,
                "Assert alert data received was the alert data sent");
            test.assertEqual(alert.getKey(), _this.testAlertKey,
                "Assert alert key received was the alert key sent");
            test.assertEqual(alert.getTarget(), _this.testTarget,
                "Assert alert target is the target that was set for the AlertMonitor");
            test.assertEqual(alert.getType(), _this.testAlertType,
                "Assert alert type received was the alert type published");
        };
        this.alertMonitor.addResponder(this.testAlertType, this.testAlertKey, this.testResponderFunction, this.testResponderContext);
        this.alertMonitor.alertResponse(this.testAlertType, this.testAlertKey, this.testAlertData);
        test.assertTrue(this.calledVar,
            "Assert responder function was called.");
    }
};
annotate(alertMonitorAddResponderAlertResponseTest).with(
    annotation("Test").params("AlertMonitor addResponder/alertResponse test")
);
