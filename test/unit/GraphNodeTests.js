//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var Class = require('../../lib/Class');
var GraphNode = require('../../lib/GraphNode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var GraphNodeTests = {

    /**
     * This tests
     * 1) Instantiation of a new GraphNode
     */
    graphNodeInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testValue = "some value";
        var testGraphNode = new GraphNode(testValue);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(testGraphNode, GraphNode),
            "Assert GraphNode instance extends GraphNode ");
        this.assertEqual(testGraphNode.getValue(), testValue,
            "Assert value was set correctly during instantiation");

    }).with('@Test("GraphNode instantiation test")'),

    /**
     * This tests
     * 1) That GraphNodes with the same value are equal
     * 2) That GraphNodes with different values are not equal
     */
    graphNodeEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testValue1 = "value1";
        var testValue2 = "value2";

        var equalGraphNode1 = new GraphNode(testValue1);
        var equalGraphNode2 = new GraphNode(testValue1);

        var notEqualGraphNode1 = new GraphNode(testValue1);
        var notEqualGraphNode2 = new GraphNode(testValue2);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(equalGraphNode1, equalGraphNode2,
            "Assert GraphNodes with the same value are equal");
        this.assertNotEqual(notEqualGraphNode1, notEqualGraphNode2,
            "Assert GraphNodes with different values are not equal.");

    }).with('@Test("GraphNode equality test")'),

    /**
     * This tests
     * 1) That GraphNodes with the same function and context have the same hash code
     */
    graphNodeHashCodeEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testValue = "value";
        var graphNode1 = new GraphNode(testValue);
        var graphNode2 = new GraphNode(testValue);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(graphNode1.hashCode(), graphNode2.hashCode(),
            "Assert GraphNodes with the same value have equal hash codes");


    }).with('@Test("GraphNode hash code equality test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = GraphNodeTests;
