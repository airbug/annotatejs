//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AlertMonitor = require('../../AlertMonitor');
var AnnotationSourceNode = require('../source/node/AnnotationSourceNode');
var Class = require('../../Class');
var DocumentNode = require('../../DocumentNode');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ScriptMonitor = Class.extend(AlertMonitor, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(script) {

        this._super(script);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        script.addEventListener(DocumentNode.EventType.NODE_ADDED, this.hearNodeAddedEvent, this);
        script.addEventListener(DocumentNode.EventType.NODE_REMOVED, this.hearNodeRemovedEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Event} event
     */
    hearNodeAddedEvent: function(event) {
        var newNode = event.getTarget();
        if (Class.doesExtend(newNode, AnnotationSourceNode)) {
            this.alertResponse(ScriptMonitor.AlertTypes.NODE_ADDED, "annotation:" + newNode.getName(), newNode);
        }
    },

    /**
     * @private
     * @param {Event} event
     */
    hearNodeRemovedEvent: function(event) {
        var newNode = event.getTarget();
        if (Class.doesExtend(newNode, AnnotationSourceNode)) {
            this.alertResponse(ScriptMonitor.AlertTypes.NODE_REMOVED, "annotation:" + newNode.getName(), newNode);
        }
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

ScriptMonitor.AlertTypes = {
    NODE_ADDED: "ScriptMonitor:NodeAdded",
    NODE_REMOVED: "ScriptMonitor:NodeRemoved"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ScriptMonitor;
