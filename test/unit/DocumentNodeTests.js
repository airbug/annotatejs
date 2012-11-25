//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var DocumentNode = require('../../lib/DocumentNode');
var TestAnnotation = require('../../lib/unit/TestAnnotation');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var test = TestAnnotation.test;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) Instantiation of a new DocumentNode
 * 2) That the parent of the node is undefined after instantiation
 * 3) That the childNodes is an empty List after instantiation
 * 4) That thw ownerDocument is undefined after instantiation
 */
var documentNodeInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.documentNode = new DocumentNode();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.documentNode.getParentNode(), undefined,
            "Assert DocumentNode parent was set correctly during instantiation");
        test.assertEqual(this.documentNode.getOwnerDocument(), undefined,
            "Assert DocumentNode owner document was set correctly during instantiation");
        test.assertEqual(this.documentNode.getParentDispatcher(), undefined,
            "Assert DocumentNode parent dispatcher was set correctly during instantiation");
        test.assertEqual(this.documentNode.getChildNodes().isEmpty(), true,
            "Assert DocumentNode childNodes is empty after instantiation");
    }
};
annotate(documentNodeInstantiationTest).with(
    test().name("DocumentNode instantiation test")
);


/**
 * This tests
 * 1) Adding a DocumentNode as a child of another DocumentNode
 * 2) That the parent of the child node is set correctly
 * 3) That the childNodes list of the parent contains one node and it's the node that was added
 */
var documentNodeAddChildNodeTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.parentDocumentNode = new DocumentNode();
        this.childDocumentNode = new DocumentNode();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        this.parentDocumentNode.addChildNode( this.childDocumentNode);
        test.assertEqual(this.childDocumentNode.getParentNode(), this.parentDocumentNode,
            "Assert parent node was set correctly on child node when adding the node to the parent");
        test.assertEqual(this.childDocumentNode.getParentDispatcher(), this.parentDocumentNode,
            "Assert parent dispatcher was set correctly on child node when adding the node to the parent");
        test.assertEqual(this.parentDocumentNode.numberChildNodes(), 1,
            "Assert number childNodes is 1 after adding a child");
        test.assertEqual(this.parentDocumentNode.getChildNodeAt(0), this.childDocumentNode,
            "Assert child node is at the 0 index of the parent");
        test.assertEqual(this.parentDocumentNode.containsChildNode(this.childDocumentNode), true,
            "Assert parent node contains child node");
        test.assertEqual(this.childDocumentNode.numberChildNodes(), 0,
            "Assert child node does not have any children");
        test.assertEqual(this.parentDocumentNode.getParentNode(), undefined,
            "Assert parent node of parent node is still undefined");
    }
};
annotate(documentNodeAddChildNodeTest).with(
    test().name("DocumentNode addChild test")
);
