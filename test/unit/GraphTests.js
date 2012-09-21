//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../../lib/Annotate').annotate;
var Class = require('../../lib/Class');
var Graph = require('../../lib/Graph');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var GraphTests = {

    /**
     * This tests
     * 1) Instantiation of a new Graph
     */
    graphInstantiationTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testGraph = new Graph();


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertTrue(Class.doesExtend(testGraph, Graph),
            "Assert Graph instance extends Graph class");

    }).with('@Test("Graph instantiation test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = GraphTests;
