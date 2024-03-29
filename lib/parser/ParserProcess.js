//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var EventDispatcher = require('../EventDispatcher');


var child_process = require('child_process');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ParserProcess = Class.extend(EventDispatcher, {

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
         * @type {ChildProcess}
         */
        this.childProcess = null;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {SourceFile} sourceFile
     */
    parseFile: function(sourceFile) {

        //TODO BRN: Instead of sending info about the source file this way, we shoudl pass the object using the marshaller system
        // There is important data in the sourceFile that would be good to send across and it is a relatively small object.
        this.childProcess.send({
            type: "parseFile",
            data: {
                filePath: sourceFile.getFilePath()
            }
        });
    },

    /**
     *
     */
    start: function() {
        this.childProcess = child_process.fork(__dirname + '/parser_child_boot.js');
        var _this = this;
        this.childProcess.on('message', function(message) {
            _this.processMessage(message);
        });
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Object} message
     */
    processMessage: function(message) {
        console.log('PARENT got message:', message);
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

ParserProcess.EventType = {
    PARSE_COMPLETE: "ParserProcess:ParseComplete"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ParserProcess;
