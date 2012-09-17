/**
 * FragmentMap rules
 * 1) When performing a get, the map breaks a key in to fragments based on the delimiter ":". Then looks for all values
 * that map to each fragment.
 * 2) When performing a put, the map takes a fragment and maps the value only to that fragment.
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Collection = require('./Collection');
var HashTable = require('./HashTable');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var FragmentMap = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {HashTable}
         */
        this.hashTable = new HashTable();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {number}
     */
    getCount: function() {
        return this.hashTable.getCount();
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class methods
    //-------------------------------------------------------------------------------

    /**
     *
     */
    clear: function() {
        this.hashTable = new HashTable();
    },

    /**
     * @param {string} key
     * @return {Collection} Returns the collection of values that map to the fragments of the key. Returns an empty
     * Collection if no value is found.
     */
    get: function(key) {
        var keyParts = this.breakKeyInToParts(key);
        var collection = new Collection();
        var keyFragment = "";
        for (var i = 0, size = keyParts.length; i < size; i++) {
            var keyPart = keyParts[i];
            if (i !== 0) {
                keyFragment += ":";
            }
            keyFragment += keyPart;
            var value = this.hashTable.get(keyFragment);
            collection.add(value);
        }
        return collection;

    },

    /**
     * @param {string} keyFragment
     * @return {*}
     */
    getFragment: function(keyFragment) {
        return this.hashTable.get(keyFragment);
    },

    /**
     * @return {boolean}
     */
    isEmpty: function() {
        return this.hashTable.isEmpty();
    },

    /**
     * @param {*} keyFragment
     * @param {*} value
     * @return {*}
     */
    putFragment: function(keyFragment, value) {
        return this.hashTable.put(keyFragment, value);
    },

    /**
     * @param {*} keyFragment
     * @return {*}
     */
    removeFragment: function(keyFragment) {
        return this.hashTable.remove(keyFragment);
    },


    //-------------------------------------------------------------------------------
    // Private Class methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {string} key
     */
    breakKeyInToParts: function(key) {
        return key.split(':');
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = FragmentMap;
