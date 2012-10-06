//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var Class = require('../../lib/Class');
var Collection = require('../../lib/Collection');
var Map = require('../../lib/Map');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var MapTests = {

    /**
     *
     */
    mapSimplePutContainsValueTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var map = new Map();
        map.put('key1', 'value1');
        map.put('key2', 'value2');


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(map.containsValue('value1'), true,
            "Assert containsValue returns true for value1.");
        this.assertEqual(map.containsValue('value2'), true,
            "Assert containsValue returns true for value2.");
        this.assertEqual(map.containsValue('value3'), false,
            "Assert containsValue returns false for value that hasn't been added to the map.");

    }).with('@Test("Map - simple put/containsValue test")'),

    /**
     *
     */
    mapSimplePutGetTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var map = new Map();
        map.put('key1', 'value1');


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(map.get('key1'), 'value1', "Assert value mapped to key is correct.");

    }).with('@Test("Map - simple put/get test")'),

    /**
     * This tests..
     * 1) That the getKeyCollection method successfully returns a Collection
     * 2) That the getKeyCollection method of an empty Map returns an empty Collection
     */
    mapGetKeyCollectionOnEmptyMapTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var map = new Map();
        var emptyKeyCollection = map.getKeyCollection();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(emptyKeyCollection, Collection),
            "Assert getKeyCollection returned a Collection when called on an empty Map");
        this.assertEqual(emptyKeyCollection.getCount(), 0,
            "Assert key Collection count is 0");

    }).with('@Test("Map - getKeyCollection called on an empty Map test")'),

    /**
     * This tests..
     * 1) That the getKeyCollection method successfully returns a Collection
     * 2) That the getKeyCollection method of an empty Map returns a map with all of the Map's keys
     */
    mapGetKeyCollectionTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var map = new Map();
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        map.put('key3', 'value3');
        var keyCollection = map.getKeyCollection();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(keyCollection, Collection),
            "Assert getKeyCollection returned a Collection");
        this.assertEqual(keyCollection.getCount(), 3,
            "Assert key Collection count is 3");
        this.assertEqual(keyCollection.contains('key1'), true,
            "Assert key Collection contains key1");
        this.assertEqual(keyCollection.contains('key2'), true,
            "Assert key Collection contains key2");
        this.assertEqual(keyCollection.contains('key3'), true,
            "Assert key Collection contains key3");

    }).with('@Test("Map - getKeyCollection test")'),

    /**
     *
     */
    mapDataTypeKeyTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------
        var keys = [
            {},
            [],
            'key',
            123,
            true
        ];
        var values = [
            'value1',
            'value2',
            'value3',
            'value4',
            'value5'
        ];
        var map = new Map();

        for (var i = 0, size = keys.length; i < size; i++) {
            var key = keys[i];
            var value = values[i];
            map.put(key, value);
        }


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(map.containsKey(keys[0]), "Assert plain javascript object can be used as a key.");
        this.assertTrue(map.containsKey(keys[1]), "Assert plain javascript array can be used as a key.");
        this.assertTrue(map.containsKey(keys[2]), "Assert plain javascript string can be used as a key.");
        this.assertTrue(map.containsKey(keys[3]), "Assert plain javascript number can be used as a key.");
        this.assertTrue(map.containsKey(keys[4]), "Assert plain javascript boolean can be used as a key.");

        this.assertFalse(map.containsKey({}), "Assert that different plain javascript objects are treated as different keys.");
        this.assertFalse(map.containsKey([]), "Assert that different plain javascript arrays are treated as different keys.");


    }).with('@Test("Map - data type key test")')

    //TODO BRN: Add a test for native javascript object names such as "constructor" and "hasOwnProperty"
    //TODO BRN: Add a remove test
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = MapTests;
