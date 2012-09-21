//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../../../lib/Annotate').annotate;
var Class = require('../../../../lib/Class');
var DependencyGraph = require('../../../../lib/compiler/module/DependencyGraph');
var List = require('../../../../lib/List');
var Set = require('../../../../lib/Set');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var DependencyGraphTests = {

    /**
     * This tests
     * 1) Instantiation of a new DependencyGraph
     */
    dependencyGraphInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testDependencyGraph = new DependencyGraph();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(testDependencyGraph, DependencyGraph),
            "Assert DependencyGraph instance extends DependencyGraph class");

    }).with('@Test("DependencyGraph instantiation test")'),

    /**
     * This tests
     * 1) The case where Node A depends on node B and C AND node B depends on node C
     * A -> B
     * A -> C
     * B -> C
     */
    dependencyGraphNodeADependsOnNodeBAndCAndNodeBDependsOnNodeCTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testDependencyGraph = new DependencyGraph();
        var mockScriptA = {value:"ValueA"};
        var mockScriptB = {value:"ValueB"};
        var mockScriptC = {value:"ValueC"};
        var mockExportA = {
            getExportName: function() {
                return "nodeA";
            },
            getScript: function() {
                return mockScriptA;
            }
        };
        var mockExportB = {
            getExportName: function() {
                return "nodeB";
            },
            getScript: function() {
                return mockScriptB;
            }
        };
        var mockExportC = {
            getExportName: function() {
                return "nodeC";
            },
            getScript: function() {
                return mockScriptC;
            }
        };
        var mockRequireAtoB = {
            getRequireName: function() {
                return "nodeB";
            },
            getScript: function() {
                return mockScriptA;
            }
        };
        var mockRequireAtoC = {
            getRequireName: function() {
                return "nodeC";
            },
            getScript: function() {
                return mockScriptA;
            }
        };
        var mockRequireBtoC = {
            getRequireName: function() {
                return "nodeC";
            },
            getScript: function() {
                return mockScriptB;
            }
        };

        testDependencyGraph.addScript(mockScriptA);
        testDependencyGraph.addScript(mockScriptB);
        testDependencyGraph.addScript(mockScriptC);
        testDependencyGraph.addExportCode(mockExportA);
        testDependencyGraph.addExportCode(mockExportB);
        testDependencyGraph.addExportCode(mockExportC);
        testDependencyGraph.addRequireCode(mockRequireAtoB);
        testDependencyGraph.addRequireCode(mockRequireAtoC);
        testDependencyGraph.addRequireCode(mockRequireBtoC);


        // Run Test
        //-------------------------------------------------------------------------------

        var scriptsInDependentOderList = undefined;
        this.assertNotThrows(function() {
            scriptsInDependentOderList = testDependencyGraph.getScriptsInDependentOrder();
        });
        this.assertEqual(scriptsInDependentOderList.getCount(), 3,
            "Assert three nodes are present in the dependent order list");
        this.assertEqual(scriptsInDependentOderList.getAt(0), mockScriptC,
            "Assert node C was first in the list");
        this.assertEqual(scriptsInDependentOderList.getAt(1), mockScriptB,
            "Assert node B was second in the list");
        this.assertEqual(scriptsInDependentOderList.getAt(2), mockScriptA,
            "Assert node A was third in the list");


        //NOTE BRN: This gives a quick test where we start with the top most node. Since B points to C and A points to
        // C, we want to ensure that this doesn't make the DependencyGraph think that it's a circular reference.

        this.assertNotThrows(function() {
            testDependencyGraph.processDependentOrderRecursive(testDependencyGraph.getNode(mockScriptA), new Set(),
                new List(), new Set());
        });

        var testProcessedNodeSet = new Set();
        testProcessedNodeSet.add(testDependencyGraph.getNode(mockScriptC));
        this.assertNotThrows(function() {
            testDependencyGraph.processDependentOrderRecursive(testDependencyGraph.getNode(mockScriptA), testProcessedNodeSet,
                new List(), new Set());
        });

    }).with('@Test("DependencyGraph node A depends on node B and C AND node B depends on node C test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DependencyGraphTests;
