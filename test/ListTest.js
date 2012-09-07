//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var List = require('../lib/List');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var ListTest = {
    /**
     *
     */
    listAddTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var list = new List();


        // Run Test
        //-------------------------------------------------------------------------------

        list.add('value1');
        this.assertEqual(list.getAt(0), 'value1', "Assert first item added to the list is at index 0.");

        list.add('value2');
        this.assertEqual(list.getAt(0), 'value1',
            "Assert first item added to the list is still at index 0 after adding a second item.");
        this.assertEqual(list.getAt(1), 'value2',
            "Assert second item added to the list is at index 1.");


        list.add('value3');
        this.assertEqual(list.getAt(0), 'value1',
            "Assert first item added to the list is still at index 0 after adding a third item.");
        this.assertEqual(list.getAt(1), 'value2',
            "Assert second item added to the list is still at index 1 after adding a third item.");
        this.assertEqual(list.getAt(2), 'value3',
            "Assert third item added to the list is at index 2.");

    }).with('@Test("List add test")'),

    /**
     *
     */
    listContainsTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var list = new List();


        // Run Test
        //-------------------------------------------------------------------------------

        list.add('value1');
        this.assertEqual(list.getAt(0), 'value1', "Assert first item added to the list is at index 0.");
        this.assertEqual(list.contains('value1'), true, "Assert list contains function reports added value is " +
            "contained.");

    }).with('@Test("List contains test")'),

    /**
     *
     */
    listRemoveTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var list = new List();


        // Run Test
        //-------------------------------------------------------------------------------

        list.add('value1');
        this.assertEqual(list.getAt(0), 'value1', "Assert first item added to the list is at index 0.");

        list.remove('value2');
        this.assertEqual(list.getCount(), 1,
            "List count has not changed when it tried to remove an item that didn't exist in the list.");
        this.assertEqual(list.getAt(0), 'value1',
            "List still contains item after trying to remove an item that didn't exist.");

        list.remove('value1');
        this.assertEqual(list.getCount(), 0, "List count reports 0 after removing last item from list.");

    }).with('@Test("List remove test")')

};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ListTest;
