//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../../lib/Annotate').annotate;
var Class = require('../../../../lib/Class');
var DependencyEdge = require('../../../../lib/compiler/module/DependencyEdge');
var DependencyNode = require('../../../../lib/compiler/module/DependencyNode');
var ExportCode = require('../../../../lib/compiler/module/ExportCode');
var RequireCode = require('../../../../lib/compiler/module/RequireCode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var DependencyEdgeTests = {

    /**
     * This tests
     * 1) Instantiation of a new DependencyEdge
     */
    dependencyEdgeInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testFromDependencyNode = new DependencyNode("fromValue");
        var testToDependencyNode = new DependencyNode("toValue");

        //TODO BRN: Replace these with mocks using sinon

        var mockExportCode = {};
        var mockRequireCode = {};
        var testDependencyEdge = new DependencyEdge(testFromDependencyNode, testToDependencyNode, mockRequireCode, mockExportCode);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(testDependencyEdge, DependencyEdge),
            "Assert DependencyEdge instance extends DependencyEdge class");
        this.assertEqual(testDependencyEdge.getFromNode(), testFromDependencyNode,
            "Assert fromNode is the value that was passed in during instantiation");
        this.assertEqual(testDependencyEdge.getToNode(), testToDependencyNode,
            "Assert toNode is the value that was passed in during instantiation");
        this.assertEqual(testDependencyEdge.getExportCode(), mockExportCode,
            "Assert exportCode is the value that was passed in during instantiation");
        this.assertEqual(testDependencyEdge.getRequireCode(), mockRequireCode,
            "Assert requireCode is the value that was passed in during instantiation");


    }).with('@Test("DependencyEdge instantiation test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyEdgeTests;
