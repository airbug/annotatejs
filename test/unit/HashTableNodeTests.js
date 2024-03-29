//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var HashTableNode = require('../../lib/HashTableNode');
var TestAnnotation = require('../../lib/unit/TestAnnotation');
var TypeUtil = require('../../lib/TypeUtil');


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
 * 1) Instantiation of a new HashTableNode
 * 2) That the count of a HashTableNode is 0 after instantiation
 */
var hashTableNodeInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.hashTableNode = new HashTableNode();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.hashTableNode.getCount(), 0,
            "Assert HashTableNode count is 0 after instantiation");
    }
};
annotate(hashTableNodeInstantiationTest).with(
    test().name("HashTableNode - instantiation test")
);


/**
 * This tests
 * 1) That the getKeyArray method returns an array of the HashTableNode's keys
 */
var hashTableNodeGetKeyArrayTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.hashTableNode = new HashTableNode();
        this.hashTableNode.put('key1', 'value1');
        this.hashTableNode.put('key2', 'value2');
        this.hashTableNode.put('key3', 'value3');
        this.keyArray = this.hashTableNode.getKeyArray();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(TypeUtil.isArray(this.keyArray),
            "Assert value returned from getKeyArray is an array");
        test.assertEqual(this.keyArray.length, 3,
            "Assert key array length is 3");
        test.assertTrue((this.keyArray.indexOf('key1') >= 0),
            "Assert key1 is in the key array");
        test.assertTrue((this.keyArray.indexOf('key2') >= 0),
            "Assert key2 is in the key array");
        test.assertTrue((this.keyArray.indexOf('key3') >= 0),
            "Assert key3 is in the key array");
    }
};
annotate(hashTableNodeGetKeyArrayTest).with(
    test().name("HashTableNode - getKeyArray test")
);
