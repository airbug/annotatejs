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
