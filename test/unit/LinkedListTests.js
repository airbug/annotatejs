//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var LinkedList = require('../../lib/LinkedList');


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
var linkedListGetCountTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.linkedList = new LinkedList();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.linkedList.getCount(), 0, "Assert empty list has 0 count");
    }
};
annotate(linkedListGetCountTest).with(
    annotation("Test").params("LinkedList getCount test")
);


/**
 *
 */
var linkedListAddFirstTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.linkedList = new LinkedList();
        this.firstValue = 'value1';
        this.linkedList.addFront(this.firstValue);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.linkedList.getCount(), 1,
            "Assert count is 1 after adding first value");
        test.assertEqual(this.linkedList.getFirst(), this.firstValue,
            "Assert value returned with getFirst is the first value added.");
        test.assertEqual(this.linkedList.getLast(), this.firstValue,
            "Assert value returned with getLast is the first value added since there's only one value.");
        test.assertEqual(this.linkedList.getAt(0), this.firstValue,
            "Assert value returned with getAt(0) is the first value added.");
    }
};
annotate(linkedListAddFirstTest).with(
    annotation("Test").params("LinkedList addFront test")
);
