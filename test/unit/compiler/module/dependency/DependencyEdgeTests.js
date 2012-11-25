//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../../../lib/Annotate');
var Class = require('../../../../../lib/Class');
var DependencyEdge = require('../../../../../lib/compiler/module/dependency/DependencyEdge');
var DependencyNode = require('../../../../../lib/compiler/module/dependency/DependencyNode');
var TestAnnotation = require('../../../../../lib/unit/TestAnnotation');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var test = TestAnnotation.test;


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) Instantiation of a new DependencyEdge
 */
var dependencyEdgeInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testFromDependencyNode = new DependencyNode("fromValue");
        this.testToDependencyNode = new DependencyNode("toValue");

        //TODO BRN: Replace these with mocks using sinon

        this.mockExportCode = {};
        this.mockRequireCode = {};
        this.testDependencyEdge = new DependencyEdge(this.testFromDependencyNode, this.testToDependencyNode, this.mockRequireCode, this.mockExportCode);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.testDependencyEdge, DependencyEdge),
            "Assert DependencyEdge instance extends DependencyEdge class");
        test.assertEqual(this.testDependencyEdge.getFromNode(), this.testFromDependencyNode,
            "Assert fromNode is the value that was passed in during instantiation");
        test.assertEqual(this.testDependencyEdge.getToNode(), this.testToDependencyNode,
            "Assert toNode is the value that was passed in during instantiation");
        test.assertEqual(this.testDependencyEdge.getExportCode(), this.mockExportCode,
            "Assert exportCode is the value that was passed in during instantiation");
        test.assertEqual(this.testDependencyEdge.getRequireCode(), this.mockRequireCode,
            "Assert requireCode is the value that was passed in during instantiation");
    }
};
annotate(dependencyEdgeInstantiationTest).with(
    test().name("DependencyEdge instantiation test")
);
