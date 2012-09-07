/**
 * Based on the google closure library.
 * http://closure-library.googlecode.com/svn/docs/interface_goog_structs_Collection.html
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var CollectionValue = require('./CollectionValue');
var HashcodeUtil = require('./HashcodeUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Collection = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.count = 0;

        this.collectionValueObject = {};
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {number}
     */
    getCount: function() {
        return this.count;
    },

    /**
     * @return {Array}
     * @speed O(n) n is the number of values in the collection.
     */
    getValues: function() {
        var valueArray = [];
        for (var hashKey in this.collectionValueObject) {
            var collectionValue = this.collectionValueObject[hashKey];
            valueArray.push(collectionValue.getValue());
        }
        return valueArray;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {Collection}
     * @speed O(n) n is the number of values in this collection
     */
    clone: function() {
        var cloneCollection = new Collection();
        cloneCollection.addAll(this);
        return cloneCollection;
    },

    /**
     * @param {*} value
     * @return {boolean}
     * @speed O(n) n is the number of values in value
     */
    equals: function(value) {
        if (Class.doesExtend(value, Collection)) {
            if (value.getCount() === this.getCount()) {
                for (var collectionValue in value.collectionValueObject) {
                    var thisCollectionValue = this.getCollectionValue(collectionValue.getValue());
                    if (thisCollectionValue) {
                        if (!thisCollectionValue.equals(collectionValue)) {
                            return false;
                        }
                        // Fall through...
                    } else {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {*} value
     * @speed O(1)
     */
    add: function(value) {
        var collectionValue = this.getCollectionValue(value);
        if (collectionValue) {
            collectionValue.incrementCount();
        } else {
            this.putCollectionValue(value);
        }
        this.count++;
    },

    /**
     * @param {Collection} collection
     * @speed O(n) n is the number of values in the collection.
     */
    addAll: function(collection) {
        if (Class.doesExtend(collection, Collection)) {
            var _this = this;
            collection.forEach(function(value) {
                _this.add(value);
            });
        } else {
            throw new Error("collection must be an instance of Collection");
        }
    },

    /**
     * @speed O(1)
     */
    clear: function() {
        this.count = 0;
        this.collectionValueObject = {};
    },


    /**
     * @param {*} value
     * @return {boolean}
     * @speed O(1)
     */
    contains: function(value) {
        return this.hasCollectionValue(value);
    },

    /**
     * Multiple elements are ignored in this function.
     * e.g. Collection[0,1] containsAll Collection[0,1,1,1] is true
     * If you want to check for exact equality, use the equals function.
     * Empty collections are always contained by another collection
     * e.g. Collection[0,1] containsAll Collection[] is true
     * @param {Collection} collection
     * @return {boolean}
     * @speed O(n) n is the number of values in collection
     */
    containsAll: function(collection) {
        if (Class.doesExtend(collection, Collection)) {
            collection.forEach(function(value) {
                if (!this.contains(value)) {
                    return false;
                }
            });
            return true;
        } else {
            throw new Error("collection must be an instance of Collection");
        }
    },

    /**
     * @param {function(*)} func
     * @speed O(n) where n is the number of values in this collection
     */
    forEach: function(func) {
        for (var collectionValueHashcode in this.collectionValueObject) {
            var collectionValue = this.collectionValueObject[collectionValueHashcode];
            for (var i = 0; i < collectionValue.getCount(); i++) {
                func(collectionValue.getValue());
            }
        }
    },

    /**
     * @return {boolean}
     * @speed O(1)
     */
    isEmpty: function() {
        return this.count === 0;
    },

    /**
     * @param {*} value
     * @speed O(1)
     */
    remove: function(value) {
        var collectionValue = this.getCollectionValue(value);
        if (collectionValue) {
            if (collectionValue.getCount() > 1) {
                collectionValue.decrementCount();
            } else {
                this.removeCollectionValue(value);
            }
            this.count--;
        }
    },

    /**
     * @param {Collection} collection
     * @speed O(n) n is the number of values in collection
     */
    removeAll: function(collection) {
        if (Class.doesExtend(collection, Collection)) {
            var _this = this;
            collection.forEach(function(value) {
                _this.remove(value);
            });
        } else {
            throw new Error("collection must be an instance of Collection");
        }
    },


    //-------------------------------------------------------------------------------
    // Private Methods
    //-------------------------------------------------------------------------------

    /**
     * @protected
     * @param {*} value
     * @return {CollectionValue}
     * @speed O(1)
     */
    getCollectionValue: function(value) {
        if (this.hasCollectionValue(value)) {
            var hashcode = HashcodeUtil.hashcode(value);
            return this.collectionValueObject[hashcode];
        }
        return null;
    },

    /**
     * @protected
     * @param {*} value
     * @return {boolean}
     * @speed O(1)
     */
    hasCollectionValue: function(value) {
        var hashcode = HashcodeUtil.hashcode(value);
        return Object.prototype.hasOwnProperty.call(this.collectionValueObject, hashcode);
    },

    /**
     * @protected
     * @param {*} value
     * @speed O(1)
     */
    putCollectionValue: function(value) {
        var hashcode = HashcodeUtil.hashcode(value);
        var collectionValue = new CollectionValue(value);
        this.collectionValueObject[hashcode] = collectionValue;
    },

    /**
     * @protected
     * @param {*} value
     * @speed O(1)
     */
    removeCollectionValue: function(value) {
        var hashcode = HashcodeUtil.hashcode(value);
        delete this.collectionValueObject[hashcode];
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Collection;
