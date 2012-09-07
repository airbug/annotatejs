//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Collection = require('../lib/Collection');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var CollectionTest = {
    /**
     *
     */
    collectionAddTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var collection = new Collection();


        // Run Test
        //-------------------------------------------------------------------------------

        collection.add('value1');
        this.assertEqual(collection.getCount(), 1, "Assert count value is incremented after adding an item to the " +
            "collection");
        this.assertEqual(collection.contains('value1'), true, "Assert contains function indicates that the collection " +
            "contains the added value.");

        collection.add('value2');
        this.assertEqual(collection.getCount(), 2, "Assert count value is incremented after adding second item to the " +
            "collection");
        this.assertEqual(collection.contains('value1'), true, "Assert contains function indicates that the collection " +
            "contains the first added value.");
        this.assertEqual(collection.contains('value2'), true, "Assert contains function indicates that the collection " +
            "contains the second added value.");


        collection.add('value3');
        this.assertEqual(collection.getCount(), 3, "Assert count value is incremented after adding third item to the " +
            "collection");
        this.assertEqual(collection.contains('value1'), true, "Assert contains function indicates that the collection " +
            "contains the first added value.");
        this.assertEqual(collection.contains('value2'), true, "Assert contains function indicates that the collection " +
            "contains the second added value.");
        this.assertEqual(collection.contains('value3'), true, "Assert contains function indicates that the collection " +
            "contains the third added value.");

    }).with('@Test("Collection add test")'),

    /**
     *
     */
    collectionGetValuesTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var collection = new Collection();


        // Run Test
        //-------------------------------------------------------------------------------

        collection.add('value1');
        collection.add('value2');
        collection.add('value3');

        var valuesArray = collection.getValues();

        this.assertEqual(valuesArray, ['value1', 'value2', 'value3'], "Assert value array from getValues call.");

    }).with('@Test("Collection get values test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = CollectionTest;
