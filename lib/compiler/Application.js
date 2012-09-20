//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var Event = require('../Event');
var EventDispatcher = require('../EventDispatcher');
var List = require('../List');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Application = Class.extend(EventDispatcher, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        // NOTE BRN: The input files should never be modified except by the user who is writing code. The output files
        // can be modified by the compiler.

        /**
         * @private
         * @type {List<Script>}
         */
        this.inputScriptList = new List();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Script} script
     */
    addScript: function(script) {
        if (!this.inputScriptList.contains(script)) {
            this.inputScriptList.add(script);
        }
        this.dispatchEvent(new Event(Application.EventTypes.SCRIPT_ADDED, script));
    },

    /**
     * @param {Script} script
     */
    removeScript: function(script) {
        //TODO BRN:
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

Application.EventTypes = {
    SCRIPT_ADDED: "Application:ScriptAdded",
    SCRIPT_REMOVED: "Application:ScriptRemoved"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Application;
