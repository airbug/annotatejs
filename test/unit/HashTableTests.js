//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var HashTable = require('../../lib/HashTable');
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
 * 1) Instantiation of a new HashTable
 * 2) That the count of a HashTable is 0 after instantiation
 */
var hashTableInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.hashTable = new HashTable();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.hashTable.getCount(), 0,
            "Assert HashTable count is 0 after instantiation");
    }
};
annotate(hashTableInstantiationTest).with(
    test().name("HashTable - instantiation test")
);


/**
 * This tests
 * 1) That the getKeyArray method returns an array of the HashTable's keys
 */
var hashTableGetKeyArrayTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.hashTable = new HashTable();
        this.hashTable.put('key1', 'value1');
        this.hashTable.put('key2', 'value2');
        this.hashTable.put('key3', 'value3');
        this.keyArray = this.hashTable.getKeyArray();
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
annotate(hashTableGetKeyArrayTest).with(
    test().name("HashTableNode - getKeyArray test")
);


/**
 * This tests
 * 1) That the getValueArray method returns an array of the HashTable's values
 */
var hashTableGetValueArrayTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.hashTable = new HashTable();
        this.hashTable.put('key1', 'value1');
        this.hashTable.put('key2', 'value2');
        this.hashTable.put('key3', 'value3');
        this.valueArray = this.hashTable.getValueArray();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertTrue(TypeUtil.isArray(this.valueArray),
            "Assert value returned from getValueArray is an array");
        test.assertEqual(this.valueArray.length, 3,
            "Assert value array length is 3");
        test.assertTrue((this.valueArray.indexOf('value1') >= 0),
            "Assert value1 is in the value array");
        test.assertTrue((this.valueArray.indexOf('value2') >= 0),
            "Assert value2 is in the value array");
        test.assertTrue((this.valueArray.indexOf('value3') >= 0),
            "Assert value3 is in the value array");
    }
};
annotate(hashTableGetValueArrayTest).with(
    test().name("HashTableNode - getValueArray test")
);
