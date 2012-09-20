//TEST
var startTime = (new Date()).getTime();

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('./lib/Annotate');


//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

//TODO BRN: Not sure this is the right way of getting the project directory.
var projectDir = process.cwd();
var sourcePaths = [projectDir + "/.build/src"];
var outputPath = projectDir + "/.build/out";
var outputFileName = "app.js";
Annotate.compileClient(sourcePaths, outputPath, outputFileName);

var endTime = (new Date()).getTime();
console.log("Compilation completed in " + (endTime - startTime) + "ms");
