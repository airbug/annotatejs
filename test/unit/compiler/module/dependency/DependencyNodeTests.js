//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../../../lib/Annotate');
var Class = require('../../../../../lib/Class');
var DependencyNode = require('../../../../../lib/compiler/module/dependency/DependencyNode');


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
 * 1) Instantiation of a new DependencyNode
 */
var dependencyNodeInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testDependencyNode = new DependencyNode();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.testDependencyNode, DependencyNode),
            "Assert DependencyNode instance extends DependencyNode class");
    }
};
annotate(dependencyNodeInstantiationTest).with(
    annotation("Test").params("DependencyNode instantiation test")
);
