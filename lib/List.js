//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Collection = require('./Collection');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var List = Class.extend(Collection, {

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
         * @type {Array.<*>}
         */
        this.valueArray = [];
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @override
     * @return {Array} Array is in the same order as the list
     * @speed O(n) n is the number of values in this list
     */
    getValues: function() {
        var valueArray = [];
        for (var i = 0, size = this.valueArray.length; i < size; i++) {
            valueArray.push(this.valueArray[i]);
        }
        return valueArray;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {List}
     * @speed O(n) n is the number of values in this list
     */
    clone: function() {
        var cloneList = new List();
        cloneList.addAll(this);
        return cloneList;
    },

    /**
     * Two lists are equal if they have the same elements in the same order.
     *
     */
    equals: function() {

    },


    //-------------------------------------------------------------------------------
    // Extended Collection Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {*} value
     * @speed O(1)
     */
    add: function(value) {
        this._super(value);
        this.valueArray.push(value);
    },

    /**
     * @override
     * @param {function(*)} func
     * @speed O(n) where n is the number of values in this list
     */
    forEach: function(func) {
        for (var i = 0, size = this.valueArray.length; i < size; i++) {
            func(this.valueArray[i]);
        }
    },

    /**
     * Removes the FIRST occurrence of value from the list
     * @param {*} value
     * @speed O(n) n is the number of values in this list
     */
    remove: function(value) {
        if (this.contains(value)) {
            var index = this.indexOfFirst(value);
            this.removeAt(index);
        }
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {number} index
     * @param {*} value
     * @speed O(1)
     */
    addAt: function(index, value) {

        // NOTE BRN: The index can be less than OR EQUAL TO the count. If equal to the count, we are adding values to
        // the very end of the list.

        if (index <= this.getCount()) {
            var collectionValue = this.getCollectionValue(value);
            if (!collectionValue) {
                this.addCollectionValue(value);
            } else {
                collectionValue.incrementCount();
            }
            this.count++;
            this.valueArray.splice(index, 0, value);
        } else {
            throw new Error("Index out of bounds");
        }
    },

    /**
     * @param {number} index
     * @param {Collection} collection
     * @speed O(n) n is the number of values in collection.
     */
    addAllAt: function(index, collection) {
        if (Class.doesExtend(collection, Collection)) {
            var insertingIndex = index;
            var _this = this;
            collection.forEach(function(value) {
                _this.addAt(insertingIndex, value);

                // NOTE BRN: We increment the inserting index so that the collection is inserted in the correct order.

                insertingIndex++;
            });
        } else {
            throw new Error("collection must be an instance of Collection");
        }
    },

    /**
     * @param {number} index
     * @return {*}
     * @speed O(1)
     */
    getAt: function(index) {
        if (index < this.getCount()) {
            return this.valueArray[index];
        } else {
            throw new Error("Index out of bounds");
        }
    },

    /**
     * @param {*} value
     * @return {number}
     * @speed O(n)
     */
    indexOfFirst: function(value) {
        return this.valueArray.indexOf(value);
    },

    /**
     * @param {*} value
     * @return {number}
     * @speed O(n)
     */
    indexOfLast: function(value) {
        return this.valueArray.lastIndexOf(value);
    },

    /**
     * @param {number} index
     * @speed O(1)
     */
    removeAt: function(index) {
        var value = this.getAt(index);
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
     * @param index
     * @param value
     * @speed O(1)
     */
    set: function(index, value) {
        this.removeAt(index);
        this.addAt(index, value);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = List;
