/**
 * Based on the google closure library.
 * http://closure-library.googlecode.com/svn/docs/class_goog_structs_Set.html
 *
 * A Set
 * 1) Cannot contain duplicate elements.
 * 2) A 'duplicate' is considered any object where o1.equals(o2) or any primitive value where v1 === v2
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Collection = require('./Collection');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Set = Class.extend(Collection, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {Set}
     * @speed O(n) n is the number of values in this set
     */
    clone: function() {
        var cloneSet = new Set();
        cloneSet.addAll(this);
        return cloneSet;
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
        if (!collectionValue) {
            this.putCollectionValue(value);
            this.count++;
        }
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Set;