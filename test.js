//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var BugUnit = require('./lib/unit/BugUnit');
var List = require('./lib/List');
var TestScan = require('./lib/unit/TestScan');


//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

//TODO BRN: Not sure this is the right way of getting the project directory.
var projectDir = process.cwd();

requireModulesFromDirectory(projectDir + "/test");
var testScan = new TestScan();
testScan.scan();
var reportCard = BugUnit.runTests(true);

console.log("Number of PASSED tests: " + reportCard.numberPassedTests());
console.log("Number of FAILED tests: " + reportCard.numberFailedTests());

reportCard.getFailedTestResultList().forEach(function(testResult) {
    console.log("Test '" + testResult.getTest().getName() + "' FAILED with " + testResult.numberFailedAssertions() + " of " +
        testResult.numberAssertions() + " failed assertions.");
    testResult.getFailedAssertionResultList().forEach(function(assertionResult) {
        console.log(assertionResult.getMessage());
    });
    if (testResult.errorOccurred()) {
        console.log("An error occurred while running this test.");
        console.log(testResult.getError().stack);
    }
});


//-------------------------------------------------------------------------------
// Helper Methods
//-------------------------------------------------------------------------------

function requireModulesFromDirectory(directoryPathString) {
    var sourcePathList = scanDirectoryForSourceFiles(directoryPathString);
    sourcePathList.forEach(function(sourcePath) {
        require(sourcePath);
    });
}

/**
 * @param {string} directoryPathString
 * @param {boolean} scanRecursively (defaults to true)
 * @return {List<string>}
 */
function scanDirectoryForSourceFiles(directoryPathString, scanRecursively) {
    console.log("scanning directory for tests - " + directoryPathString);
    if (scanRecursively === undefined) {
        scanRecursively = true;
    }
    var sourcePathList = new List();
    var fileStringArray = fs.readdirSync(directoryPathString);
    for (var i = 0, size = fileStringArray.length; i < size; i++) {
        var pathString = directoryPathString + "/" + fileStringArray[i];
        var stat = fs.statSync(pathString);
        if (stat.isDirectory()) {
            if (scanRecursively) {
                var childModulePathList = scanDirectoryForSourceFiles(pathString);
                sourcePathList.addAll(childModulePathList);
            }
        } else if (stat.isFile()) {
            if (pathString.lastIndexOf('.js') === pathString.length - 3) {
                sourcePathList.add(pathString);
            }
        }
    }
    return sourcePathList;
}
