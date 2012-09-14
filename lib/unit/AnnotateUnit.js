//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../Annotate');
var Class = require('../Class');
var List = require('../List');
var Obj = require('../Obj');
var ReportCard = require('./ReportCard');
var Test = require('./Test');
var TestRunner = require('./TestRunner');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AnnotateUnit = Class.extend(Obj, {

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

AnnotateUnit.registeredTestList = new List();


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

AnnotateUnit.registerTest = function(testName, testFunction) {
    var test = new Test(testName, testFunction);
    AnnotateUnit.registeredTestList.add(test);
};

/**
 * @param {boolean} logResults
 * @return {*}
 */
AnnotateUnit.runTests = function(logResults) {
    var reportCard = new ReportCard();
    AnnotateUnit.registeredTestList.forEach(function(test) {
        var testResult = TestRunner.runTest(test, logResults);
        reportCard.addTestResult(testResult);
    });
    return reportCard;
};


//-------------------------------------------------------------------------------
// Bootstrap
//-------------------------------------------------------------------------------

Annotate.registerAnnotationProcessor('Test', function(annotation) {
    AnnotateUnit.registerTest(annotation.getParamList().getAt(0), annotation.getReference());
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AnnotateUnit;
