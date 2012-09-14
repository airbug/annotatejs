//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var GraphEdge = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(nodeFrom, nodeTo) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Node}
         */
        this.nodeFrom = nodeFrom;

        /**
         * @private
         * @type {Node}
         */
        this.nodeTo = nodeTo;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {Node}
     */
    getNodeFrom: function() {
        return this.nodeFrom;
    },

    /**
     * @return {Node}
     */
    getNodeTo: function() {
        return this.nodeTo;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    equals: function(value) {
        if (Class.doesExtend(value, GraphEdge)) {
            return (Obj.equals(value.getNodeFrom(), this.getNodeFrom()) && Obj.equals(value.getNodeTo(), this.getNodeTo()));
        }
        return false;
    },

    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = Obj.hashCode("[GraphEdge]" + Obj.hashCode(this.nodeFrom) + "_" + Obj.hashCode(this.nodeTo));
        }
        return this._hashCode;
    },

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        output += "{\n";

        output += "}\n";
        return output;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = GraphEdge;
