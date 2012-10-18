//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var List = require('./List');
var Obj = require('./Obj');
var RobinNode = require('./RobinNode');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var RoundRobin = Class.extend(Obj, {

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
         * @type {number}
         */
        this.index = -1;

        /**
         * @private
         * @type {List<RobinNode>}
         */
        this.robinNodeList = new List();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {number}
     */
    getCount: function() {
        return this.robinNodeList.getCount();
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {*} value
     */
    add: function(value) {
        var robinNode = new RobinNode(value);
        this.robinNodeList.add(robinNode);
    },

    /**
     * @return {*}
     */
    next: function() {
        if (this.robinNodeList.getCount() > 0) {
            this.index++;
            if (this.index >= this.robinNodeList.getCount()) {
                this.index = 0;
            }
            var robinNode = this.robinNodeList.getAt(this.index);
            return robinNode.getValue();
        }
        return undefined;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = RoundRobin;
