//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var Class = require('../../lib/Class');
var RoundRobin = require('../../lib/RoundRobin');


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
 * 1) Instantiation of a new RoundRobin
 */
var roundRobinInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testRoundRobin = new RoundRobin();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.testRoundRobin, RoundRobin),
            "Assert RoundRobin instance extends RoundRobin class");
    }
};
annotate(roundRobinInstantiationTest).with(
    annotation("Test").params("RoundRobin instantiation test")
);


/**
 * This tests
 * 1) That the next() method returns values in a round robin fashion.
 */
var roundRobinNextTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testRoundRobin = new RoundRobin();
        this.testValue1 = "test value 1";
        this.testValue2 = "test value 2";
        this.testValue3 = "test value 3";
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        this.testRoundRobin.add(this.testValue1);
        this.testRoundRobin.add(this.testValue2);
        this.testRoundRobin.add(this.testValue3);

        test.assertEqual(this.testRoundRobin.next(), this.testValue1,
            "Assert first call to next is test value 1");
        test.assertEqual(this.testRoundRobin.next(), this.testValue2,
            "Assert second call to next is test value 2");
        test.assertEqual(this.testRoundRobin.next(), this.testValue3,
            "Assert third call to next is test value 3");
        test.assertEqual(this.testRoundRobin.next(), this.testValue1,
            "Assert fourth call to next is test value 1");
    }
};
annotate(roundRobinNextTest).with(
    annotation("Test").params("RoundRobin next() test")
);
