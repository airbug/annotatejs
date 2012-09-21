//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var Alert = require('../../lib/Alert');
var Class = require('../../lib/Class');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var AlertTests = {

    /**
     * This tests
     * 1) Instantiation of a new Alert
     * 2) That the data, key, target, and type properties are set correctly during instantiation
     */
    alertInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testData = "testData";
        var testKey = "testKey:key";
        var testTarget = {};
        var testType = "testType";
        var alert = new Alert(testType, testKey, testTarget, testData);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(alert, Alert),
            "Assert new instance of Alert does extend Alert");
        this.assertEqual(alert.getData(), testData,
            "Assert Alert data was set correctly during instantiation");
        this.assertEqual(alert.getKey(), testKey,
            "Assert Alert key was set correctly during instantiation");
        this.assertEqual(alert.getTarget(), testTarget,
            "Assert Alert target was set correctly during instantiation");
        this.assertEqual(alert.getType(), testType,
            "Assert Alert type was set correctly during instantiation");

    }).with('@Test("Alert instantiation test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AlertTests;
