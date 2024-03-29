//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var EventListener = require('./EventListener');
var IEventDispatcher = require('./IEventDispatcher');
var List = require('./List');
var Map = require('./Map');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

// NOTE BRN: The primary difference between an EventDispatcher and Publisher model is that in an EventDispatcher model
// the listener knows which object it is listening to, so it's very understood where the EventListener is receiving
// the event from. In a Publisher model, the 'listener' or receiver of a message does not know where the message originated
// from. So it is much more anonymous. This model is better for cases where any number of objects can send a message
// and you have fewer number of receivers of that message.

var EventDispatcher = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(target) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Map}
         */
        this.eventTypeListenerMap = new Map();

        /**
         * @private
         * @type {EventDispatcher}
         */
        this.parentDispatcher = undefined;

        /**
         * @private
         * @type {*}
         */
        this.target = target ? target : this;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {EventDispatcher}
     */
    getParentDispatcher: function() {
        return this.parentDispatcher;
    },

    /**
     * @param {EventDispatcher} parentDispatcher
     */
    setParentDispatcher: function(parentDispatcher) {
        this.parentDispatcher = parentDispatcher;
    },

    /**
     * @return {*}
     */
    getTarget: function() {
        return this.target;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {?Object} listenerContext (optional)
     */
    addEventListener: function(eventType, listenerFunction, listenerContext) {
        var eventTypeListenerList = this.eventTypeListenerMap.get(eventType);
        if (!eventTypeListenerList) {
            eventTypeListenerList = new List();
            this.eventTypeListenerMap.put(eventType, eventTypeListenerList);
        }

        var eventListener = new EventListener(listenerFunction, listenerContext);
        if (!eventTypeListenerList.contains(eventListener)) {
            eventTypeListenerList.add(eventListener);
        }
    },

    /**
     * @param {Event} event
     * @param {?boolean=} bubbles
     */
    dispatchEvent: function(event, bubbles) {
        if (bubbles === undefined) {
            bubbles = true;
        }

        //NOTE BRN: These values are read only, but we sneakily set the value here.

        event.bubbles = bubbles;
        event.target = this.target;
        this.propagateEvent(event);
    },

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {?Object} listenerContext (optional)
     */
    hasEventListener: function(eventType, listenerFunction, listenerContext) {
        var eventTypeListenerList = this.eventTypeListenerMap.get(eventType);
        if (eventTypeListenerList) {
            var eventListener = new EventListener(listenerFunction, listenerContext);
            return eventTypeListenerList.contains(eventListener);
        }
        return false;
    },

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {Object} listenerContext
     */
    removeEventListener: function(eventType, listenerFunction, listenerContext) {
        var eventTypeListenerList = this.eventTypeListenerMap.get(eventType);
        if (eventTypeListenerList) {
            var eventListener = new EventListener(listenerFunction, listenerContext);
            eventTypeListenerList.remove(eventListener);
        }
    },

    /**
     *
     */
    removeAllListeners: function() {
        this.eventTypeListenerMap.clear();
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @protected
     * @param {Event} event
     */
    propagateEvent: function(event) {
        if (!event.isPropagationStopped()) {
            var eventTypeListenerList = this.eventTypeListenerMap.get(event.getType());
            if (eventTypeListenerList) {

                // NOTE BRN: Clone the event listener list so that if the list is changed during execution of the listeners
                // we still execute all of the listeners.

                var cloneEventTypeListenerList = eventTypeListenerList.clone();
                cloneEventTypeListenerList.forEach(function(eventListener) {
                    eventListener.hearEvent(event);
                });
            }
            if (event.getBubbles()) {
                var parentDispatcher = this.getParentDispatcher();
                if (parentDispatcher) {
                    parentDispatcher.propagateEvent(event);
                }
            }
        }
    }
});
Class.implement(EventDispatcher, IEventDispatcher);


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = EventDispatcher;
