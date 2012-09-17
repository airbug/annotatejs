/**
 * Rules for Graph
 * 1) Does not support multiple of the same Node. Each Node should be unique.
 * 2) Does not support multiple of the same Edge. Each Edge should be unique. A unique Edge is a unique nodeFrom and
 * nodeTo pair.
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Obj = require('./Obj');
var Set = require('./Set');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Graph = Class.extend(Obj, {

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
         * @type {Set<Edge>}
         */
        this.edgeSet = new Set();

        /**
         * @private
         * @type {Set<Node>}
         */
        this.nodeSet = new Set();
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    addEdge: function(edge) {
       if (!this.edgeSet.contains(edge)) {

       } else {
           throw new Error("Each edge must be unique.");
       }
    },

    addNode: function(node) {
        if (!this.nodeSet.contains(node)) {

        } else {
            throw new Error("Each node must be unique.");
        }
    },

    //getNode: function()


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        return output;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Graph;
