//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var HashTableEntry = require('../../lib/HashTableEntry');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 * This tests
 * 1) Instantiation of a new HashTableEntry
 * 2) That the "key" property was set correctly during instantiation
 * 3) That the "value" property was set correctly during instantiation
 */
var hashTableEntryInstantiationTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testKey = "testKey";
        this.testValue = "testValue";
        this.hashTableEntry = new HashTableEntry(this.testKey, this.testValue);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.hashTableEntry.getKey(), this.testKey,
            "Assert key property was set correctly during instantiation");
        test.assertEqual(this.hashTableEntry.getValue(), this.testValue,
            "Assert value property was set correctly during instantiation");
    }
};
annotate(hashTableEntryInstantiationTest).with(
    annotation("Test").params("HashTableEntry - instantiation test")
);
