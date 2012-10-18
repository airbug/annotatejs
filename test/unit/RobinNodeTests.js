//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var Class = require('../../lib/Class');
var RobinNode = require('../../lib/RobinNode');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) Instantiation of a new RobinNode
 */
var robinNodeInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testValue = "some value";
        this.testRobinNode = new RobinNode(this.testValue);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.testRobinNode, RobinNode),
            "Assert RobinNode instance extends RobinNode ");
        test.assertEqual(this.testRobinNode.getValue(), this.testValue,
            "Assert value was set correctly during instantiation");
    }
};
annotate(robinNodeInstantiationTest).with(
    annotation("Test").params("RobinNode instantiation test")
);
