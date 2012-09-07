//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Map = require('../lib/Map');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var MapTest = {
    /**
     *
     */
    mapPutTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var map = new Map();
        map.put('key1', 'value1');


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(map.get('key1'), 'value1', "Assert value mapped to key is correct.");

    }).with('@Test("Map put test")'),

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


    }).with('@Test("Map data type key test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = MapTest;
