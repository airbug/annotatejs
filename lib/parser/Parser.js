//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var EventDispatcher = require('../EventDispatcher');
var ParserProcess = require('./ParserProcess');
var RoundRobin = require('../RoundRobin');
var Set = require('../Set');

var os = require('os');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Parser = Class.extend(EventDispatcher, {

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
         * @type {Set<RoundRobin>}
         */
        this.parserProcessRoundRobin = new RoundRobin();

        /**
         * @private
         * @type {Set<SourceFile>}
         */
        this.sourceFileSet = new Set();

        /**
         * @private
         * @type {Set<SourceHome>}
         */
        this.sourceHomeSet = null;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Set<SourceHome>} sourceHomeSet
     */
    initialize: function(sourceHomeSet) {
        this.sourceHomeSet = sourceHomeSet;
        this.startParserProcesses();
        //TODO BRN: Finding the source files can be sped up by making it async. We'd need to delay the completion of initialization.
        this.sourceFileSet = this.findSourceFiles(this.sourceHomeSet);
    },

    /**
     *
     */
    activate: function() {
        this.parseSourceFiles();
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param sourcePathSet
     * @return {Set<SourceFile>}
     */
    findSourceFiles: function(sourcePathSet) {

        //TODO BRN: This process can be sped up by making it async.

        var finalSourceFileSet = new Set();
        sourcePathSet.forEach(function(sourcePath) {
            var sourceFileSet = sourcePath.getSourceFiles();
            finalSourceFileSet.addAll(sourceFileSet);
        });
        return finalSourceFileSet;
    },

    /**
     * @private
     */
    parseSourceFiles: function() {
        this.roundRobinSourceFilesToParserChildren();
    },

    /**
     * @private
     */
    roundRobinSourceFilesToParserChildren: function() {
        var _this = this;
        this.sourceFileSet.forEach(function(sourceFile) {
            var parserProcess = _this.parserProcessRoundRobin.next();
            parserProcess.parseFile(sourceFile);
        });
    },

    /**
     * @private
     */
    startParserProcesses: function() {
        var numCPUs = os.cpus().length;
        var numberToStart = numCPUs - this.parserProcessRoundRobin.getCount();
        for (var i = 0; i < numberToStart; i++) {
            var parserProcess = new ParserProcess();
            this.parserProcessRoundRobin.add(parserProcess);
            parserProcess.setParentDispatcher(this);
            parserProcess.start();
        }
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Parser;
