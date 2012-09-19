//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var DocumentNode = require('../lib/DocumentNode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var DocumentNodeTest = {

    /**
     * This tests
     * 1) Instantiation of a new DocumentNode
     * 2) That the parent of the node is undefined after instantiation
     * 3) That the childNodes is an empty List after instantiation
     * 4) That thw ownerDocument is undefined after instantiation
     */
    documentNodeInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var documentNode = new DocumentNode();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(documentNode.getParentNode(), undefined,
            "Assert DocumentNode parent was set correctly during instantiation");
        this.assertEqual(documentNode.getOwnerDocument(), undefined,
            "Assert DocumentNode owner document was set correctly during instantiation");
        this.assertEqual(documentNode.getParentDispatcher(), undefined,
            "Assert DocumentNode parent dispatcher was set correctly during instantiation");
        this.assertEqual(documentNode.getChildNodes().isEmpty(), true,
            "Assert DocumentNode childNodes is empty after instantiation");

    }).with('@Test("DocumentNode instantiation test")'),

    /**
     * This tests
     * 1) Adding a DocumentNode as a child of another DocumentNode
     * 2) That the parent of the child node is set correctly
     * 3) That the childNodes list of the parent contains one node and it's the node that was added
     */
    documentNodeAddChildNodeTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var parentDocumentNode = new DocumentNode();

        var childDocumentNode = new DocumentNode();


        // Run Test
        //-------------------------------------------------------------------------------

        parentDocumentNode.addChildNode(childDocumentNode);
        this.assertEqual(childDocumentNode.getParentNode(), parentDocumentNode,
            "Assert parent node was set correctly on child node when adding the node to the parent");
        this.assertEqual(childDocumentNode.getParentDispatcher(), parentDocumentNode,
            "Assert parent dispatcher was set correctly on child node when adding the node to the parent");
        this.assertEqual(parentDocumentNode.numberChildNodes(), 1,
            "Assert number childNodes is 1 after adding a child");
        this.assertEqual(parentDocumentNode.getChildNodeAt(0), childDocumentNode,
            "Assert child node is at the 0 index of the parent");
        this.assertEqual(parentDocumentNode.containsChildNode(childDocumentNode), true,
            "Assert parent node contains child node");
        this.assertEqual(childDocumentNode.numberChildNodes(), 0,
            "Assert child node does not have any children");
        this.assertEqual(parentDocumentNode.getParentNode(), undefined,
            "Assert parent node of parent node is still undefined");

    }).with('@Test("DocumentNode addChild test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DocumentNodeTest;
