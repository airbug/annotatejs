//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var List = require('../List');
var Test = require('./Test');
var TestResult = require('./TestResult');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var TestRunner = {};


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

TestRunner.runTest = function(test, logResults) {
    var testResult = new TestResult(test);
    var hearAssertionResult = function(event) {
        var assertionResult = event.data;
        if (logResults) {
            console.log(assertionResult.getMessage());
        }
        testResult.addAssertionResult(assertionResult);
    };
    test.addEventListener(Test.EventType.ASSERTION_RESULT, hearAssertionResult);
    try {
        if (logResults) {
            console.log("Running test [" + test.getName() + "]");
        }
        test.runTest();
        if (logResults) {
            console.log("Completed test [" + test.getName() + "]");
        }
    } catch (error) {
        if (logResults) {
            console.log("Error occurred - message:" + error.message);
        }
        if (logResults) {
            console.log("Aborted test [" + test.getName() + "]");
        }
        testResult.setError(error);
    }
    test.removeEventListener(Test.EventType.ASSERTION_RESULT, hearAssertionResult);
    return testResult;
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = TestRunner;
