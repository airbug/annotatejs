//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var TreeNode = require('../../lib/TreeNode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var TreeNodeTests = {

    /**
     * This tests
     * 1) Instantiation of a new TreeNode
     * 2) That the "value" is the value passed in during instantiation
     * 3) That the parent of the node is null after instantiation
     * 4) That the childNodes is an empty List after instantiation
     */
    instantiateTreeNodeTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testValue = "testValue";
        var treeNode = new TreeNode(testValue);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(treeNode.getValue(), testValue,
            "Assert TreeNode value was set correctly during instantiation");
        this.assertEqual(treeNode.getParentNode(), null,
            "Assert TreeNode parent was set correctly during instantiation");
        this.assertEqual(treeNode.getChildNodes().isEmpty(), true,
            "Assert TreeNode childNodes is empty after instantiation");

    }).with('@Test("TreeNode instantiation test")')


};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = TreeNodeTests;
