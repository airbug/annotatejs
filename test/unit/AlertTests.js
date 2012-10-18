//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var Alert = require('../../lib/Alert');
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
 * 1) Instantiation of a new Alert
 * 2) That the data, key, target, and type properties are set correctly during instantiation
 */
var alertInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testData = "testData";
        this.testKey = "testKey:key";
        this.testTarget = {};
        this.testType = "testType";
        this.alert = new Alert(this.testType, this.testKey, this.testTarget, this.testData);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.alert, Alert),
            "Assert new instance of Alert does extend Alert");
        test.assertEqual(this.alert.getData(), this.testData,
            "Assert Alert data was set correctly during instantiation");
        test.assertEqual(this.alert.getKey(), this.testKey,
            "Assert Alert key was set correctly during instantiation");
        test.assertEqual(this.alert.getTarget(), this.testTarget,
            "Assert Alert target was set correctly during instantiation");
        test.assertEqual(this.alert.getType(), this.testType,
            "Assert Alert type was set correctly during instantiation");
    }
};
annotate(alertInstantiationTest).with(
    annotation("Test").params("Alert instantiation test")
);
