//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../Annotate');
var Class = require('../Class');
var Obj = require('../Obj');
var ReportCard = require('./ReportCard');
var Set = require('../Set');
var Test = require('./Test');
var TestRunner = require('./TestRunner');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var BugUnit = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();

        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

/**
 * @private
 * @type {Set<Test>}
 */
BugUnit.registeredTestSet = new Set();


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {Test} test
 */
BugUnit.registerTest = function(test) {
    if (!BugUnit.registeredTestSet.contains(test)) {
        BugUnit.registeredTestSet.add(test);
    }
};

/**
 * @param {boolean} logResults
 * @return {ReportCard}
 */
BugUnit.runTests = function(logResults) {
    var reportCard = new ReportCard();
    BugUnit.registeredTestSet.forEach(function(test) {
        var testResult = TestRunner.runTest(test, logResults);
        reportCard.addTestResult(testResult);
    });
    return reportCard;
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = BugUnit;
