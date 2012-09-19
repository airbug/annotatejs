//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Document = require('../lib/Document');
var DocumentNode = require('../lib/DocumentNode');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var DocumentTest = {

    /**
     * This tests
     * 1) Instantiation of a new Document
     * 2) That the parent of the node is null after instantiation
     * 3) That the childNodes is an empty List after instantiation
     */
    documentInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var document = new Document();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(document.getParentNode(), undefined,
            "Assert Document parent was set correctly during instantiation");
        this.assertEqual(document.getOwnerDocument(), undefined,
            "Assert Document owner document was set correctly during instantiation");
        this.assertEqual(document.getParentDispatcher(), undefined,
            "Assert Document parent dispatcher was set correctly during instantiation");
        this.assertEqual(document.getChildNodes().isEmpty(), true,
            "Assert Document childNodes is empty after instantiation");

    }).with('@Test("Document instantiation test")'),

    /**
     * This tests
     * 1) Adding a child DocumentNode to a Document
     * 2) That the ownerDocument of a child is set correctly.
     */
    documentAddChildNodeTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var document = new Document();
        var documentNode = new DocumentNode();


        // Run Test
        //-------------------------------------------------------------------------------

        document.addChildNode(documentNode);

        this.assertEqual(document.getParentNode(), undefined,
            "Assert Document parent is still undefined after adding a child");
        this.assertEqual(document.getOwnerDocument(), undefined,
            "Assert Document ownerDocument is still undefined after adding a child");
        this.assertEqual(document.getParentDispatcher(), undefined,
            "Assert Document parentDispatcher is still undefined after adding a child");
        this.assertEqual(document.getChildNodes().getCount(), 1,
            "Assert Document childNodes has one child after adding a child");
        this.assertEqual(document.getChildNodes().contains(documentNode), true,
            "Assert Document childNodes contains the child that was added");
        this.assertEqual(documentNode.getParentNode(), document,
            "Assert DocumentNode parentNode is now the document");
        this.assertEqual(documentNode.getOwnerDocument(), document,
            "Assert DocumentNode ownerDocument is now the document");
        this.assertEqual(documentNode.getParentDispatcher(), document,
            "Assert DocumentNode parentDispatcher is now the document");

    }).with('@Test("Document addChildNode test")'),

    /**
     * This tests
     * 1) Adding a child DocumentNode that already has children to a Document
     * 2) That the ownerDocument of all children is set correctly
     */
    documentAddChildNodeWithChildrenTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var document = new Document();
        var documentNode = new DocumentNode();
        var documentNodeChild = new DocumentNode();


        // Run Test
        //-------------------------------------------------------------------------------

        //NOTE BRN: Add the child first before adding it to the document

        documentNode.addChildNode(documentNodeChild);
        document.addChildNode(documentNode);

        this.assertEqual(documentNode.getOwnerDocument(), document,
            "Assert DocumentNode ownerDocument is now the document");
        this.assertEqual(documentNodeChild.getOwnerDocument(), document,
            "Assert DocumentNode's child's ownerDocument is now the document");

    }).with('@Test("Document addChildNode with children test")'),

    /**
     * This tests
     * 1) Walking a document
     * 2) That the nodes are walked in the correct top down depth first order.
     */
    documentWalkOrderTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testDocument = new Document();
        var child1ofDocument = new DocumentNode();
        var child2ofDocument =  new DocumentNode();
        var child1ofChild1ofDocument = new DocumentNode();
        var child2ofChild1ofDocument = new DocumentNode();
        var child3ofChild1ofDocument = new DocumentNode();
        var child1ofChild2ofChild1ofDocument = new DocumentNode();

        testDocument.addChildNode(child1ofDocument);
        testDocument.addChildNode(child2ofDocument);
        child1ofDocument.addChildNode(child1ofChild1ofDocument);
        child1ofDocument.addChildNode(child2ofChild1ofDocument);
        child1ofDocument.addChildNode(child3ofChild1ofDocument);
        child2ofChild1ofDocument.addChildNode(child1ofChild2ofChild1ofDocument);

        var expectedWalkOrder = [
            testDocument,
            child1ofDocument,
            child1ofChild1ofDocument,
            child2ofChild1ofDocument,
            child1ofChild2ofChild1ofDocument,
            child3ofChild1ofDocument,
            child2ofDocument
        ];


        // Run Test
        //-------------------------------------------------------------------------------

        var actualWalkOrder = [];
        testDocument.walk(function(value) {
            actualWalkOrder.push(value);
        });

        this.assertEqual(actualWalkOrder.length, expectedWalkOrder.length,
            "Assert the walk took the correct number of steps");
        for (var i = 0, size = actualWalkOrder.length; i < size; i++) {
            this.assertEqual(actualWalkOrder[i], expectedWalkOrder[i],
                "Assert Document walk step '" + expectedWalkOrder[i] + "' was performed in the correct order");
        }

    }).with('@Test("Document walk order test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = DocumentTest;
