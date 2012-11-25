//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var Document = require('../../lib/Document');
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
 * 1) Instantiation of a new Document
 * 2) That the parent of the node is null after instantiation
 * 3) That the childNodes is an empty List after instantiation
 */
var documentInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.document = new Document();
    },
    

    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.document.getParentNode(), undefined,
            "Assert Document parent was set correctly during instantiation");
        test.assertEqual(this.document.getOwnerDocument(), undefined,
            "Assert Document owner document was set correctly during instantiation");
        test.assertEqual(this.document.getParentDispatcher(), undefined,
            "Assert Document parent dispatcher was set correctly during instantiation");
        test.assertEqual(this.document.getChildNodes().isEmpty(), true,
            "Assert Document childNodes is empty after instantiation");
    }
};
annotate(documentInstantiationTest).with(
    test().name("Document instantiation test")
);


/**
 * This tests
 * 1) Adding a child DocumentNode to a Document
 * 2) That the ownerDocument of a child is set correctly.
 */
var documentAddChildNodeTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.document = new Document();
        this.documentNode = new DocumentNode();
    },
    

    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        this.document.addChildNode(this.documentNode);
        test.assertEqual(this.document.getParentNode(), undefined,
            "Assert Document parent is still undefined after adding a child");
        test.assertEqual(this.document.getOwnerDocument(), undefined,
            "Assert Document ownerDocument is still undefined after adding a child");
        test.assertEqual(this.document.getParentDispatcher(), undefined,
            "Assert Document parentDispatcher is still undefined after adding a child");
        test.assertEqual(this.document.getChildNodes().getCount(), 1,
            "Assert Document childNodes has one child after adding a child");
        test.assertEqual(this.document.getChildNodes().contains(this.documentNode), true,
            "Assert Document childNodes contains the child that was added");
        test.assertEqual(this.documentNode.getParentNode(), this.document,
            "Assert DocumentNode parentNode is now the document");
        test.assertEqual(this.documentNode.getOwnerDocument(), this.document,
            "Assert DocumentNode ownerDocument is now the document");
        test.assertEqual(this.documentNode.getParentDispatcher(), this.document,
            "Assert DocumentNode parentDispatcher is now the document");
    }
};
annotate(documentAddChildNodeTest).with(
    test().name("Document addChildNode test")
);


/**
 * This tests
 * 1) Adding a child DocumentNode that already has children to a Document
 * 2) That the ownerDocument of all children is set correctly
 */
var documentAddChildNodeWithChildrenTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.document = new Document();
        this.documentNode = new DocumentNode();
        this.documentNodeChild = new DocumentNode();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {

        //NOTE BRN: Add the child first before adding it to the document

        this.documentNode.addChildNode(this.documentNodeChild);
        this.document.addChildNode(this.documentNode);
        test.assertEqual(this.documentNode.getOwnerDocument(), this.document,
            "Assert DocumentNode ownerDocument is now the document");
        test.assertEqual(this.documentNodeChild.getOwnerDocument(), this.document,
            "Assert DocumentNode's child's ownerDocument is now the document");
    }
};
annotate(documentAddChildNodeWithChildrenTest).with(
    test().name("Document addChildNode with children test")
);


/**
 * This tests
 * 1) Walking a document
 * 2) That the nodes are walked in the correct top down depth first order.
 */
var documentWalkOrderTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testDocument = new Document();
        this.child1ofDocument = new DocumentNode();
        this.child2ofDocument =  new DocumentNode();
        this.child1ofChild1ofDocument = new DocumentNode();
        this.child2ofChild1ofDocument = new DocumentNode();
        this.child3ofChild1ofDocument = new DocumentNode();
        this.child1ofChild2ofChild1ofDocument = new DocumentNode();

        this.testDocument.addChildNode(this.child1ofDocument);
        this.testDocument.addChildNode(this.child2ofDocument);
        this.child1ofDocument.addChildNode(this.child1ofChild1ofDocument);
        this.child1ofDocument.addChildNode(this.child2ofChild1ofDocument);
        this.child1ofDocument.addChildNode(this.child3ofChild1ofDocument);
        this.child2ofChild1ofDocument.addChildNode(this.child1ofChild2ofChild1ofDocument);

        this.expectedWalkOrder = [
            this.testDocument,
            this.child1ofDocument,
            this.child1ofChild1ofDocument,
            this.child2ofChild1ofDocument,
            this.child1ofChild2ofChild1ofDocument,
            this.child3ofChild1ofDocument,
            this.child2ofDocument
        ];
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        var actualWalkOrder = [];
        this.testDocument.walk(function(value) {
            actualWalkOrder.push(value);
        });

        test.assertEqual(actualWalkOrder.length,this.expectedWalkOrder.length,
            "Assert the walk took the correct number of steps");
        for (var i = 0, size = actualWalkOrder.length; i < size; i++) {
            test.assertEqual(actualWalkOrder[i], this.expectedWalkOrder[i],
                "Assert Document walk step '" + this.expectedWalkOrder[i] + "' was performed in the correct order");
        }
    }
};
annotate(documentWalkOrderTest).with(
    test().name("Document walk order test")
);
