//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var HashcodeUtil = require('./HashcodeUtil');
var List = require('./List');
var Obj = require('./Object');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Map = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.count = 0;

        this.valueObject = {};

        this.keyObject = {};
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    getCount: function() {
        return this.count;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    clone: function() {
        var cloneMap = new Map();
        cloneMap.putAll(this);
        return cloneMap;
    },


    //-------------------------------------------------------------------------------
    // Class methods
    //-------------------------------------------------------------------------------

    /**
     * @speed O(1)
     */
    clear: function() {
        this.count = 0;
        this.valueObject = {};
        this.keyObject = {};
    },

    /**
     * @param {*} key
     * @return {boolean}
     */
    containsKey: function(key) {
        var hashcode = HashcodeUtil.hashcode(key);

        // NOTE BRN: We cannot simply use this.valueObject[key] because this will cause a collision with javascript's
        // built in properties and methods (such as the constructor). To circumvent this issue we use the hasOwnProperty
        // method on Object.prototype for determining if our hash object has a key.
        // MORE INFO: http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/

        return Object.prototype.hasOwnProperty.call(this.valueObject, hashcode);
    },

    /**
     * @param {*} value
     * @return {boolean}
     */
    containsValue: function(value) {

        // NOTE BRN: The for in operator will only enumerate over our own properties, not the object's built in
        // properties. So it should be safe to access this.valueObject[key]

        for (var keyHash in this.valueObject) {
            var checkValue = this.valueObject[keyHash];
            if (Class.doesExtend(checkValue, Obj)) {
                if (checkValue.equals(value)) {
                    return true;
                }
            } else if (value === checkValue) {
                return true;
            }
        }
        return true;
    },

    forEach: function(fn) {
        for (var keyHash in this.valueObject) {
            var value = this.valueObject[keyHash];
            fn(value);
        }
    },

    get: function(key) {
        if (this.containsKey(key)) {
            var hashcode = HashcodeUtil.hashcode(key);
            return this.valueObject[hashcode];
        }
        return undefined;
    },

    isEmpty: function() {
        return this.count === 0;
    },

    listKeys: function() {
        var keyList = List();
        for (var keyHash in this.keyObject) {
            var key = this.keyObject[keyHash]; // Written by Megan
            keyList.add(key);
        }
        return keyList;
    },

    listValues: function() {
        var valueList = new List();
        for (var keyHash in this.valueObject) {
            valueList.add(this.valueObject[keyHash]);
        }
        return valueList;
    },

    put: function(key, value) {
        var hashcode = HashcodeUtil.hashcode(key);
        if (this.containsKey(key)) {
            var previousValue = this.get(key);
            this.valueObject[hashcode] = value;
            this.keyObject[hashcode] = key;
            return previousValue;
        } else {
            this.valueObject[hashcode] = value;
            this.keyObject[hashcode] = key;
            this.count++;
            return undefined;
        }
    },

    putAll: function(map) {
        if (Class.doesExtend(map, Map)) {
            var keys = map.listKeys();
            keys.forEach(function(key) {
                var value = map.get(key);
                this.put(key, value);
            });
        }
    },

    remove: function(key) {
        if (this.containsKey(key)) {
            var previousValue = this.get(key);
            var hashcode = HashcodeUtil.hashcode(key);
            delete this.valueObject[hashcode];
            delete this.keyObject[hashcode];
            this.count--;
            return previousValue;
        }
        return undefined;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Map;
