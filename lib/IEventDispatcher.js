//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Interface = require('./Interface');


//-------------------------------------------------------------------------------
// Declare Interface
//-------------------------------------------------------------------------------

var IEventDispatcher = Interface.declare({

    //-------------------------------------------------------------------------------
    // Interface Methods
    //-------------------------------------------------------------------------------

    /**
     * @return {EventDispatcher}
     */
    getParentDispatcher: function() {},

    /**
     * @param {EventDispatcher} parentDispatcher
     */
    setParentDispatcher: function(parentDispatcher) {},

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {?Object} listenerContext (optional)
     */
    addEventListener: function(eventType, listenerFunction, listenerContext) {},

    /**
     * @param {Event} event
     * @param {?boolean=} bubbles
     */
    dispatchEvent: function(event, bubbles) {},

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {?Object} listenerContext (optional)
     */
    hasEventListener: function(eventType, listenerFunction, listenerContext) {},

    /**
     *
     */
    removeAllListeners: function() {},

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {Object} listenerContext
     */
    removeEventListener: function(eventType, listenerFunction, listenerContext) {}
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = IEventDispatcher;
