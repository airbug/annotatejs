//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var EventListener = require('./EventListener');
var List = require('./List');
var Map = require('./Map');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var EventDispatcher = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(target) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.eventTypeListenerMap = new Map();

        this.target = target ? target : this;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {Object} listenerObject (optional)
     */
    addEventListener: function(eventType, listenerFunction, listenerObject) {
        var eventTypeListenerList = this.eventTypeListenerMap.get(eventType);
        if (!eventTypeListenerList) {
            eventTypeListenerList = new List();
            this.eventTypeListenerMap.put(eventType, eventTypeListenerList);
        }

        var eventListener = new EventListener(listenerFunction, listenerObject);
        if (!eventTypeListenerList.contains(eventListener)) {
            eventTypeListenerList.add(eventListener);
        }
    },

    /**
     * @param {Event} event
     */
    dispatchEvent: function(event) {
        var eventTypeListenerList = this.eventTypeListenerMap.get(event.getType());
        if (eventTypeListenerList) {

            //NOTE BRN: Target is read only, but we sneakily set the target value here.

            event.target = this.target;

            // NOTE BRN: Clone the event listener list so that if the list is changed during execution of the listeners
            // we still execute all of the listeners.

            var cloneEventTypeListenerList = eventTypeListenerList.clone();
            cloneEventTypeListenerList.forEach(function(eventListener) {
                eventListener.hearEvent(event);
            });
        }
    },

    /**
     * @param {string} eventType
     * @param {function(Event)} listenerFunction
     * @param {Object} listenerObject
     */
    removeEventListener: function(eventType, listenerFunction, listenerObject) {
        var eventTypeListenerList = this.eventTypeListenerMap.get(eventType);
        if (eventTypeListenerList) {
            var eventListener = new EventListener(listenerFunction, listenerObject);
            eventTypeListenerList.remove(eventListener);
        }
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = EventDispatcher;
