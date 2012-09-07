//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var LinkedList = require('../lib/LinkedList');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var LinkedListTest = {

    /**
     *
     */
    linkedListGetCountTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var linkedList = new LinkedList();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(linkedList.getCount(), 0, "Assert empty list has 0 count");

    }).with('@Test("LinkedList getCount test")'),

    /**
     *
     */
    linkedListAddFirstTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var linkedList = new LinkedList();


        // Run Test
        //-------------------------------------------------------------------------------

        var firstValue = 'value1';

        linkedList.addFront('value1');
        this.assertEqual(linkedList.getCount(), 1, "Assert count is 1 after adding first value");
        this.assertEqual(linkedList.getFirst(), firstValue,
            "Assert value returned with getFirst is the first value added.");
        this.assertEqual(linkedList.getLast(), firstValue,
            "Assert value returned with getLast is the first value added since there's only one value.");
        this.assertEqual(linkedList.getAt(0), firstValue,
            "Assert value returned with getAt(0) is the first value added.");

    }).with('@Test("LinkedList addFront test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = LinkedListTest;
