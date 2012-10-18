//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var LinkedList = require('../../lib/LinkedList');
var LinkedListIterator = require('../../lib/LinkedListIterator');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 *
 */
var linkedListIteratorPeekNextTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.linkedList = new LinkedList();

        // NOTE BRN: Since we're adding to the front we want to start with the last character first otherwise we'll
        // end up backwards.

        this.linkedList.addFront('value3');
        this.linkedList.addFront('value2');
        this.linkedList.addFront('value1');
        this.linkedListIterator = new LinkedListIterator(this.linkedList);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.linkedListIterator.peekNext(), 'value1',
            "Assert that the next value can be peeked at when we haven't moved the iterator.");
        this.linkedListIterator.getNext();
        test.assertEqual(this.linkedListIterator.peekNext(), 'value2',
            "Assert that we are peeking at the next value after moving the iterator.");
    }
};
annotate(linkedListIteratorPeekNextTest).with(
    annotation("Test").params("LinkedListIterator peekNext test")
);
