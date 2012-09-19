//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Alert = require('./Alert');
var AlertResponder = require('./AlertResponder');
var Class = require('./Class');
var FragmentMap = require('./FragmentMap');
var List = require('./List');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AlertMonitor = Class.extend(Obj, {

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
         * @type {FragmentMap}
         */
        this.alertKeyToAlertResponderListFragmentMap = new FragmentMap();

        /**
         * @private
         * @type {Object}
         */
        this.target = target;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {Script}
     */
    getTarget: function() {
        return this.target;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {string} alertType
     * @param {string} alertKeyFragment
     * @param {function(Alert)} responderFunction
     * @param {Object} responderContext
     */
    addResponder: function(alertType, alertKeyFragment, responderFunction, responderContext) {
        var finalAlertKeyFragment = this.generateAlertKey(alertType, alertKeyFragment);
        var alertResponderList = this.alertKeyToAlertResponderListFragmentMap.getFragment(finalAlertKeyFragment);
        if (!alertResponderList) {
            alertResponderList = new List();
            this.alertKeyToAlertResponderListFragmentMap.putFragment(finalAlertKeyFragment, alertResponderList);
        }
        var alertResponder = new AlertResponder(responderFunction, responderContext);
        if (!alertResponderList.contains(alertResponder)) {
            alertResponderList.add(alertResponder);
        }
    },

    /**
     * @param {string} alertType
     * @param {string} alertKeyFragment
     * @param {function(Alert)} responderFunction
     * @param {Object} responderContext
     */
    removeResponder: function(alertType, alertKeyFragment, responderFunction, responderContext) {
        var finalAlertKeyFragment = this.generateAlertKey(alertType, alertKeyFragment);
        var alertResponderList = this.alertKeyToAlertResponderListFragmentMap.getFragment(finalAlertKeyFragment);
        if (alertResponderList) {
            var alertResponder = new AlertResponder(responderFunction, responderContext);
            alertResponderList.remove(alertResponder);
        }
    },

    /**
     * @param {string} alertType
     * @param {string} alertKey
     * @param {*} data
     */
    alertResponse: function(alertType, alertKey, data) {
        var alertResponderList = this.getAlertResponderList(alertType, alertKey);
        var alert = new Alert(alertType, alertKey, this.getTarget(), data);
        alertResponderList.forEach(function(alertResponder) {
            alertResponder.respond(alert);
        });
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {string} alertType
     * @param {string} alertKeyFragment
     * @return {string}
     */
    generateAlertKey: function(alertType, alertKeyFragment) {

        // NOTE BRN: To speed things up, we use the alertType as part of the key. This allows us to do a single lookup
        // for all of the AlertResponders associated with the alert key fragment.

        var finalAlertKeyFragment = alertType;
        if (alertKeyFragment) {
            finalAlertKeyFragment += ":" + alertKeyFragment;
        }
        return finalAlertKeyFragment;
    },

    /**
     * @private
     * @param {string} alertType
     * @param {string} alertKey
     * @return {List<AlertResponder>}
     */
    getAlertResponderList: function(alertType, alertKey) {
        var finalAlertKey = this.generateAlertKey(alertType, alertKey);
        var alertResponderListCollection = this.alertKeyToAlertResponderListFragmentMap.get(finalAlertKey);
        var finalAlertResponderList = new List();
        alertResponderListCollection.forEach(function(alertResponderList) {
            finalAlertResponderList.addAll(alertResponderList);
        });
        return finalAlertResponderList;
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AlertMonitor;
