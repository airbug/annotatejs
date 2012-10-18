//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../../../lib/Annotate');
var Class = require('../../../../../lib/Class');
var DependencyGraph = require('../../../../../lib/compiler/module/dependency/DependencyGraph');
var List = require('../../../../../lib/List');
var Set = require('../../../../../lib/Set');


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
 * 1) Instantiation of a new DependencyGraph
 */
var dependencyGraphInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testDependencyGraph = new DependencyGraph();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(Class.doesExtend(this.testDependencyGraph, DependencyGraph),
            "Assert DependencyGraph instance extends DependencyGraph class");
    }
};
annotate(dependencyGraphInstantiationTest).with(
    annotation('Test').params("DependencyGraph instantiation test")
);


/**
 * This tests
 * 1) The case where Node A depends on node B and C AND node B depends on node C
 * A -> B
 * A -> C
 * B -> C
 */
var dependencyGraphNodeADependsOnNodeBAndCAndNodeBDependsOnNodeCTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        var _this = this;
        this.testDependencyGraph = new DependencyGraph();
        this.mockScriptA = {value:"ValueA"};
        this.mockScriptB = {value:"ValueB"};
        this.mockScriptC = {value:"ValueC"};
        this.mockExportA = {
            getExportName: function() {
                return "nodeA";
            },
            getScript: function() {
                return _this.mockScriptA;
            }
        };
        this.mockExportB = {
            getExportName: function() {
                return "nodeB";
            },
            getScript: function() {
                return _this.mockScriptB;
            }
        };
        this.mockExportC = {
            getExportName: function() {
                return "nodeC";
            },
            getScript: function() {
                return _this.mockScriptC;
            }
        };
        this.mockRequireAtoB = {
            getRequireName: function() {
                return "nodeB";
            },
            getScript: function() {
                return _this.mockScriptA;
            }
        };
        this.mockRequireAtoC = {
            getRequireName: function() {
                return "nodeC";
            },
            getScript: function() {
                return _this.mockScriptA;
            }
        };
        this.mockRequireBtoC = {
            getRequireName: function() {
                return "nodeC";
            },
            getScript: function() {
                return _this.mockScriptB;
            }
        };

        this.testDependencyGraph.addScript(this.mockScriptA);
        this.testDependencyGraph.addScript(this.mockScriptB);
        this.testDependencyGraph.addScript(this.mockScriptC);
        this.testDependencyGraph.addExportCode(this.mockExportA);
        this.testDependencyGraph.addExportCode(this.mockExportB);
        this.testDependencyGraph.addExportCode(this.mockExportC);
        this.testDependencyGraph.addRequireCode(this.mockRequireAtoB);
        this.testDependencyGraph.addRequireCode(this.mockRequireAtoC);
        this.testDependencyGraph.addRequireCode(this.mockRequireBtoC);
    },
    

    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        var _this = this;
        var scriptsInDependentOderList = undefined;
        test.assertNotThrows(function() {
            scriptsInDependentOderList = _this.testDependencyGraph.getScriptsInDependentOrder();
        });
        test.assertEqual(scriptsInDependentOderList.getCount(), 3,
            "Assert three nodes are present in the dependent order list");
        test.assertEqual(scriptsInDependentOderList.getAt(0), this.mockScriptC,
            "Assert node C was first in the list");
        test.assertEqual(scriptsInDependentOderList.getAt(1), this.mockScriptB,
            "Assert node B was second in the list");
        test.assertEqual(scriptsInDependentOderList.getAt(2),this. mockScriptA,
            "Assert node A was third in the list");
    
    
        //NOTE BRN: This gives a quick test where we start with the top most node. Since B points to C and A points to
        // C, we want to ensure that this doesn't make the DependencyGraph think that it's a circular reference.
    
        test.assertNotThrows(function() {
            _this.testDependencyGraph.processDependentOrderRecursive(_this.testDependencyGraph.getNode(_this.mockScriptA), new Set(),
                new List(), new Set());
        });
    
        var testProcessedNodeSet = new Set();
        testProcessedNodeSet.add(this.testDependencyGraph.getNode(this.mockScriptC));
        test.assertNotThrows(function() {
            _this.testDependencyGraph.processDependentOrderRecursive(_this.testDependencyGraph.getNode(_this.mockScriptA), testProcessedNodeSet,
                new List(), new Set());
        });
    }
};
annotate(dependencyGraphNodeADependsOnNodeBAndCAndNodeBDependsOnNodeCTest).with(
    annotation('Test').params("DependencyGraph node A depends on node B and C AND node B depends on node C test")
);

/**
 * This tests
 * 1) Getting an export name when the script does not have an export code applied
 * 2) Getting an export name when the dependency graph does not have the script added
 */
var dependencyGraphGetScriptExportNameTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        var _this = this;
        this.testDependencyGraph = new DependencyGraph();
        this.mockScriptA = {value:"ValueA"};
        this.mockScriptB = {value:"ValueB"};
        this.mockScriptC = {value:"ValueC"};
        this.mockExportA = {
            getExportName: function() {
                return "nodeA";
            },
            getScript: function() {
                return _this.mockScriptA;
            }
        };

        this.testDependencyGraph.addScript(this.mockScriptA);
        this.testDependencyGraph.addScript(this.mockScriptB);
        this.testDependencyGraph.addExportCode(this.mockExportA);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.testDependencyGraph.getScriptExportName(this.mockScriptA), "nodeA",
            "Assert node A is returned which has an export name");
        test.assertEqual(this.testDependencyGraph.getScriptExportName(this.mockScriptB), undefined,
            "Assert undefined is returned since script B does not have an export code but the script was added");
        test.assertEqual(this.testDependencyGraph.getScriptExportName(this.mockScriptC), undefined,
            "Assert undefined is returned since script C hasn't been added to the graph");
    }
};
annotate(dependencyGraphGetScriptExportNameTest).with(
    annotation('Test').params("DependencyGraph getScriptExportName test")
);
