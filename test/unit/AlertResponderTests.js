//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var AlertResponder = require('../../lib/AlertResponder');
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
 * 1) Instantiation of a new AlertResponder
 */
var alertResponderInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testResponderFunction = function(event) {};
        this.testResponderContext = {};
        this.alertResponder = new AlertResponder(this.testResponderFunction, this.testResponderContext);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.alertResponder, AlertResponder),
            "Assert AlertResponder instance extends AlertResponder ");
    }

};
annotate(alertResponderInstantiationTest).with(
    annotation("Test").params("AlertResponder instantiation test")
);


/**
 * This tests
 * 1) That AlertResponders with the same function and context are equal
 * 2) That AlertResponders with the same function but different contexts are not equal
 * 3) That AlertResponders with different functions but the same context are not equal
 * 4) That AlertResponders with different functions and different contexts are not equal
 */
var alertResponderEqualityTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testResponderFunction1 = function(event) {};
        this.testResponderContext1 = {};
        this.testResponderFunction2 = function(event) {};
        this.testResponderContext2 = {};

        this.equalAlertResponder1 = new AlertResponder(this.testResponderFunction1, this.testResponderContext1);
        this.equalAlertResponder2 = new AlertResponder(this.testResponderFunction1, this.testResponderContext1);

        this.notEqualAlertResponder1 = new AlertResponder(this.testResponderFunction1, this.testResponderContext1);
        this.notEqualAlertResponder2 = new AlertResponder(this.testResponderFunction1, this.testResponderContext2);
        this.notEqualAlertResponder3 = new AlertResponder(this.testResponderFunction2, this.testResponderContext1);
        this.notEqualAlertResponder4 = new AlertResponder(this.testResponderFunction2, this.testResponderContext2);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.equalAlertResponder1, this.equalAlertResponder2,
            "Assert AlertResponders with the same function and context are equal");
        test.assertNotEqual(this.notEqualAlertResponder1, this.notEqualAlertResponder2,
            "Assert AlertResponders with the same function but different contexts are not equal.");
        test.assertNotEqual(this.notEqualAlertResponder1, this.notEqualAlertResponder3,
            "Assert AlertResponders with different functions but the same context are not equal.");
        test.assertNotEqual(this.notEqualAlertResponder1, this.notEqualAlertResponder4,
            "Assert AlertResponders with different functions and different contexts are not equal.");
    }
};
annotate(alertResponderEqualityTest).with(
    annotation("Test").params("AlertResponder equality test")
);


/**
 * This tests
 * 1) That AlertResponders with the same function and context have the same hash code
 */
var alertResponderHashCodeEqualityTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testResponderFunction = function(event) {};
        this.testResponderContext = {};
        this.alertResponder1 = new AlertResponder(this.testResponderFunction, this.testResponderContext);
        this.alertResponder2 = new AlertResponder(this.testResponderFunction, this.testResponderContext);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.alertResponder1.hashCode(), this.alertResponder2.hashCode(),
            "Assert AlertResponders with the same function and context have equal hash codes");
    }
};
annotate(alertResponderHashCodeEqualityTest).with(
    annotation("Test").params("AlertResponder hash code equality test")
);


//TODO BRN: Add a respond test