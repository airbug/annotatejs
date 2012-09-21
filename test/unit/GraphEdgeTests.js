//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var Class = require('../../lib/Class');
var GraphEdge = require('../../lib/GraphEdge');
var GraphNode = require('../../lib/GraphNode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var GraphEdgeTests = {

    /**
     * This tests
     * 1) Instantiation of a new GraphEdge is successful
     */
    graphEdgeInstantiationWithGoodArgumentsTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testFromNode = new GraphNode("fromValue");
        var testToNode = new GraphNode("toValue");
        var testGraphEdge = new GraphEdge(testFromNode, testToNode);


        // Run Test
        //-------------------------------------------------------------------------------
                
        this.assertEqual(testGraphEdge.getFromNode(), testFromNode,
            "Assert fromNode was set correct during instantiation");
        this.assertEqual(testGraphEdge.getToNode(), testToNode,
            "Assert toNode was set correct during instantiation");

    }).with('@Test("GraphEdge instantiation test")'),

    /**
     * This tests
     * 1) That GraphEdges with the same fromNode and the same toNode are equal
     * 2) That GraphEdges with the same fromNode but different toNodes are not equal
     * 3) That GraphEdges with different fromNodes but the same toNode are not equal
     * 4) That GraphEdges with different fromNodes and different toNodes are not equal
     */
    graphEdgeEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testFromNode1 = new GraphNode("fromNode1");
        var testFromNode2 = new GraphNode("fromNode2");
        var testToNode1 = new GraphNode("toNode1");
        var testToNode2 = new GraphNode("toNode2");
        
        var equalGraphEdge1 = new GraphEdge(testFromNode1, testToNode1);
        var equalGraphEdge2 = new GraphEdge(testFromNode1, testToNode1);

        var notEqualGraphEdge1 = new GraphEdge(testFromNode1, testToNode1);
        var notEqualGraphEdge2 = new GraphEdge(testFromNode1, testToNode2);
        var notEqualGraphEdge3 = new GraphEdge(testFromNode2, testToNode1);
        var notEqualGraphEdge4 = new GraphEdge(testFromNode2, testToNode2);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(equalGraphEdge1, equalGraphEdge2,
            "Assert GraphEdges with the same fromNode and the same toNode are equal");
        this.assertNotEqual(notEqualGraphEdge1, notEqualGraphEdge2,
            "Assert GraphEdges with the same fromNode but different toNodes are not equal");
        this.assertNotEqual(notEqualGraphEdge1, notEqualGraphEdge3,
            "Assert GraphEdges with different fromNodes but the same toNode are not equal");
        this.assertNotEqual(notEqualGraphEdge1, notEqualGraphEdge4,
            "Assert GraphEdges with different fromNodes and different toNodes are not equal");

    }).with('@Test("GraphEdge equality test")'),

    /**
     * This tests
     * 1) That GraphNodes with the same function and context have the same hash code
     */
    graphNodeHashCodeEqualityTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testFromNode = new GraphNode("fromNode");
        var testToNode = new GraphNode("toNode");

        var graphEdge1 = new GraphEdge(testFromNode, testToNode);
        var graphEdge2 = new GraphEdge(testFromNode, testToNode);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(graphEdge1.hashCode(), graphEdge2.hashCode(),
            "Assert GraphNodes with the same value have equal hash codes");


    }).with('@Test("GraphEdge hash code equality test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = GraphEdgeTests;
