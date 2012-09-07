//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AssertionResult = require('./AssertionResult');
var Class = require('../Class');
var Event = require('../Event');
var EventDispatcher = require('../EventDispatcher');
var HashUtil = require('../HashUtil');
var TypeUtil = require('../TypeUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Test = Class.extend(EventDispatcher, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(name, testFunction) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.name = name;

        this.testFunction = testFunction;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    getName: function() {
        return this.name;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * This test uses the simple comparison operator (==) to test for equality.
     * @param value1
     * @param value2
     * @param message
     */
    assertEqual: function(value1, value2, message) {
        if (TypeUtil.isArray(value1)) {
            if (TypeUtil.isArray(value2)) {
                return arraysEqualByValue(value1, value2);
            } else {
                return false;
            }
        } else if (value1 == value2) {
            this.dispatchAssertionResultEvent(true,
                "[SUCCESS] " + message + " - Assert [equal] - expected:" + value2 + " given:" + value1);
        } else {
            this.dispatchAssertionResultEvent(false,
                "[FAIL] " + message + " - Assert [equal] - expected:" + value2 + " given:" + value1);
        }
    },

    assertNotEqual: function(value1, value2, message) {
        if (value1 != value2) {
            this.dispatchAssertionResultEvent(true,
                "[SUCCESS] " + message + " - Assert [not equal] - expected:" + value2 + " given:" + value1);
        } else {
            this.dispatchAssertionResultEvent(false,
                "[FAIL] " + message + " - Assert [not equals] - expected:" + value2 + " given:" + value1);
        }
    },

    assertTrue: function(value, message) {
        if (value) {
            this.dispatchAssertionResultEvent(true,
                "[SUCCESS] " + message + " - Assert [true] - result:" + value);
        } else {
            this.dispatchAssertionResultEvent(false,
                "[FAIL] " + message + " - Assert [true] - result:" + value);
        }
    },

    assertFalse: function(value, message) {
        if (!value) {
            this.dispatchAssertionResultEvent(true,
                "[SUCCESS] " + message + " - Assert [false] - result:" + value);
        } else {
            this.dispatchAssertionResultEvent(false,
                "[FAIL] " + message + " - Assert [false] - result:" + value);
        }
    },

    runTest: function() {
        this.testFunction();
    },

    dispatchAssertionResultEvent: function(valid, message) {
        var assertionResult = new AssertionResult(valid, message);
        this.dispatchEvent(new Event(Test.EventTypes.ASSERTION_RESULT, assertionResult));
    }
});


//-------------------------------------------------------------------------------
// Static Event Types
//-------------------------------------------------------------------------------

Test.EventTypes = {
    ASSERTION_RESULT: 'assertion_result'
};

function arraysEqualByValue(array1, array2) {
    if (array1.length === array2.length) {
        for (var i = 0, size = array1.length; i < size; i++) {
            var value1 = array1[i];
            var value2 = array2[i];
            var hash1 = HashUtil.hash(value1);
            var hash2 = HashUtil.hash(value2);
            if (hash1 !== hash2) {
                return false;
            }
        }
        return true;
    }
    return false;
}

//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Test;
