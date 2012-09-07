//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var LinkedList = require('../lib/LinkedList');
var LinkedListIterator = require('../lib/LinkedListIterator');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var LinkedListIteratorTest = {

    /**
     *
     */
    linkedListIteratorPeekNextTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var linkedList = new LinkedList();

        // NOTE BRN: Since we're adding to the front we want to start with the last character first otherwise we'll
        // end up backwards.

        linkedList.addFront('value3');
        linkedList.addFront('value2');
        linkedList.addFront('value1');
        var linkedListIterator = new LinkedListIterator(linkedList);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(linkedListIterator.peekNext(), 'value1',
            "Assert that the next value can be peeked at when we haven't moved the iterator.");
        linkedListIterator.getNext();
        this.assertEqual(linkedListIterator.peekNext(), 'value2',
            "Assert that we are peeking at the next value after moving the iterator.");


    }).with('@Test("LinkedListIterator peekNext test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = LinkedListIteratorTest;
