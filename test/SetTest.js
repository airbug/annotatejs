//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Class = require('../lib/Class');
var Set = require('../lib/Set');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var SetTest = {
    /**
     * This tests
     * 1) Adding as simple string to a set
     * 2) Adding a second simple string to a set
     */
    setAddTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var set = new Set();


        // Run Test
        //-------------------------------------------------------------------------------

        set.add('value1');
        this.assertTrue(set.contains('value1'), "Assert first item added to the set is contained within the set.");
        this.assertEqual(set.getCount(), 1, "Assert count is 1 after adding 1 item.");

        set.add('value2');
        this.assertTrue(set.contains('value1'),
            "Assert first item added to the list is still contained within the set after adding a second item.");
        this.assertTrue(set.contains('value2'),
            "Assert second item added to the set is contained within the set.");
        this.assertEqual(set.getCount(), 2, "Assert count is 2 after adding 2 items.");



    }).with('@Test("Set add test")'),

    /**
     *
     */
    setAddRepeatTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var set = new Set();


        // Run Test
        //-------------------------------------------------------------------------------

        set.add('value1');
        this.assertTrue(set.contains('value1'), "Assert first item added to the set is contained within the set.");
        this.assertEqual(set.getCount(), 1, "Assert count is 1 after adding 1 item.");

        set.add('value1');
        this.assertEqual(set.getCount(), 1, 'Assert count is still 1 after adding the same item a second time.');
        this.assertTrue(set.contains('value1'), "Assert set still contains the item after adding it twice.");

    }).with('@Test("Set add repeat test")'),

    /**
     * This tests...
     * 1) That two different class instances that have the same hashcode will be treated as the same value by Set
     * and thus only one of them will be stored.
     * 2) That adding one of the two instances to the Set will cause the Set's contains function to return true for
     * both instances
     */
    setAddRepeatHashcodeOverrideTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var set = new Set();
        var NewClass = Class.declare({
            hashcode: function() {
                return "static value";
            }
        });
        var instance1 = new NewClass();
        var instance2 = new NewClass();


        // Run Test
        //-------------------------------------------------------------------------------

        set.add(instance1);
        this.assertTrue(set.contains(instance1),
            "Assert instance 1 is contained within the set after adding it to the set.");
        this.assertEqual(set.getCount(), 1, "Assert count is 1 after adding instance 1.");
        this.assertTrue(set.contains(instance2),
            "Assert contains returns true for instance 2 even though instance 2 hasn't been added but reports the same hashcode.");

        set.add(instance2);
        this.assertEqual(set.getCount(), 1, 'Assert count is still 1 after adding instance 2.');

    }).with('@Test("Set add repeat hashcode override test")')

};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SetTest;
