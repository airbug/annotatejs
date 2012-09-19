/**
 * We use a MonitorManager so that we only have one monitor per node. This greatly limits the amount of processing we
 * need to do and Monitors are designed to limit the number of messages they have to send. This allows us to have a
 * very performant response system.
 */
//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotationSourceNodeMonitor = require('./AnnotationSourceNodeMonitor');
var AnnotationSourceNode = require('../source/node/AnnotationSourceNode');
var Class = require('../../Class');
var Map = require('../../Map');
var Obj = require('../../Obj');
var Script = require('../source/Script');
var ScriptMonitor = require('./ScriptMonitor');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var MonitorManager = Class.extend(Obj, {

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
         * @type {Map}
         */
        this.nodeToMonitorMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {SourceNode} node
     * @return {Monitor}
     */
    getMonitor: function(node) {
        return this.nodeToMonitorMap.get(node);
    },

    /*hasMonitor: function(node) {
     return this.nodeToMonitorMap.containsKey(node);
     },*/

    /**
     * @param {SourceNode} node
     * @param {Monitor} monitor
     */
    putMonitor: function(node, monitor) {
        this.nodeToMonitorMap.put(node, monitor);
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

/**
 * @static
 * @type {MonitorManager}
 */
MonitorManager.instance = new MonitorManager();


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @static
 * @param {SourceNode} node
 * @return {Monitor}
 */
MonitorManager.generateMonitor = function(node) {
    var monitor = MonitorManager.instance.getMonitor(node);
    if (!monitor) {
        if (Class.doesExtend(node, AnnotationSourceNode)) {
            monitor = new AnnotationSourceNodeMonitor(node);
        } else if (Class.doesExtend(node, Script)) {
            monitor = new ScriptMonitor(node);
        }
        if (monitor) {
            MonitorManager.instance.putMonitor(node, monitor);
        }
    }
    return monitor;
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = MonitorManager;
