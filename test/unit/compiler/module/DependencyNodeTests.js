//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../../lib/Annotate').annotate;
var Class = require('../../../../lib/Class');
var DependencyNode = require('../../../../lib/compiler/module/DependencyNode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var DependencyNodeTests = {

    /**
     * This tests
     * 1) Instantiation of a new DependencyNode
     */
    dependencyNodeInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testDependencyNode = new DependencyNode();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(testDependencyNode, DependencyNode),
            "Assert DependencyNode instance extends DependencyNode class");

    }).with('@Test("DependencyNode instantiation test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyNodeTests;
