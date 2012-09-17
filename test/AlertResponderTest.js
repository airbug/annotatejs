//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var AlertResponder = require('../lib/AlertResponder');
var Class = require('../lib/Class');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var AlertResponderTest = {

    /**
     * This tests
     * 1) Instantiation of a new AlertResponder
     */
    alertResponderInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testResponderFunction = function(event) {};
        var testResponderContext = {};
        var alertResponder = new AlertResponder(testResponderFunction, testResponderContext);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(alertResponder, AlertResponder),
            "Assert AlertResponder instance extends AlertResponder ");

    }).with('@Test("AlertResponder instantiation test")'),

    /**
     * This tests
     * 1) That AlertResponders with the same function and context are equal
     * 2) That AlertResponders with the same function but different contexts are not equal
     * 3) That AlertResponders with different functions but the same context are not equal
     * 4) That AlertResponders with different functions and different contexts are not equal
     */
    alertResponderEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testResponderFunction1 = function(event) {};
        var testResponderContext1 = {};
        var testResponderFunction2 = function(event) {};
        var testResponderContext2 = {};

        var equalAlertResponder1 = new AlertResponder(testResponderFunction1, testResponderContext1);
        var equalAlertResponder2 = new AlertResponder(testResponderFunction1, testResponderContext1);

        var notEqualAlertResponder1 = new AlertResponder(testResponderFunction1, testResponderContext1);
        var notEqualAlertResponder2 = new AlertResponder(testResponderFunction1, testResponderContext2);
        var notEqualAlertResponder3 = new AlertResponder(testResponderFunction2, testResponderContext1);
        var notEqualAlertResponder4 = new AlertResponder(testResponderFunction2, testResponderContext2);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(equalAlertResponder1, equalAlertResponder2,
            "Assert AlertResponders with the same function and context are equal");
        this.assertNotEqual(notEqualAlertResponder1, notEqualAlertResponder2,
            "Assert AlertResponders with the same function but different contexts are not equal.");
        this.assertNotEqual(notEqualAlertResponder1, notEqualAlertResponder3,
            "Assert AlertResponders with different functions but the same context are not equal.");
        this.assertNotEqual(notEqualAlertResponder1, notEqualAlertResponder4,
            "Assert AlertResponders with different functions and different contexts are not equal.");

    }).with('@Test("AlertResponder equality test")'),

    /**
     * This tests
     * 1) That AlertResponders with the same function and context have the same hash code
     */
    alertResponderHashCodeEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testResponderFunction = function(event) {};
        var testResponderContext = {};
        var alertResponder1 = new AlertResponder(testResponderFunction, testResponderContext);
        var alertResponder2 = new AlertResponder(testResponderFunction, testResponderContext);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(alertResponder1.hashCode(), alertResponder2.hashCode(),
            "Assert AlertResponders with the same function and context have equal hash codes");


    }).with('@Test("AlertResponder hash code equality test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AlertResponderTest;


//TODO BRN: Add a respond test