//TEST
var startTime = (new Date()).getTime();

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotateCompiler = require('./lib/compiler/AnnotateCompiler');


//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

//TODO BRN: Not sure this is the right way of getting the project directory.
var projectDir = process.cwd();
var sourcePaths = [projectDir + "/.build/src"];
var outputPath = projectDir + "/.build/out";
AnnotateCompiler.compile(sourcePaths, outputPath);

var endTime = (new Date()).getTime();
console.log("Compilation completed in " + (endTime - startTime) + "ms");
