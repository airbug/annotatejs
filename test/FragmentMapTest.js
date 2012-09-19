//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var FragmentMap = require('../lib/FragmentMap');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var FragmentMapTest = {

    /**
     * This tests..
     * 1) Tests putting a value in the map to a key fragment
     * 2) Tests getting that value using getFragment
     */
    fragmentMapSimplePutFragmentGetFragmentTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testKeyFragment1 = 'keyFragment1';
        var testKeyFragment2 = 'keyFragment2';
        var testValue1 = 'value1';
        var testValue2 = 'value2';
        var fragmentMap = new FragmentMap();
        fragmentMap.putFragment(testKeyFragment1, testValue1);
        fragmentMap.putFragment(testKeyFragment2, testValue2);


        // Run Test
        //-------------------------------------------------------------------------------

        this.assertEqual(fragmentMap.getFragment(testKeyFragment1), testValue1,
            "Assert getFragment returns value1 for keyFragment1 ");
        this.assertEqual(fragmentMap.getFragment(testKeyFragment2), testValue2,
            "Assert getFragment returns value2 for keyFragment2 ");

    }).with('@Test("FragmentMap simple putFragment/getFragment test")'),

    /**
     * This tests..
     * 1) Tests putting multiple values in the map that match to different fragments of the key
     * 2) Tests getting the values using the different key fragments
     */
    fragmentMapPutFragmentsGetTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var testKeyFragment1 = 'keyFragment1';
        var testKeyFragment2 = 'keyFragment2';
        var testKeyFragment3 = 'keyFragment1:keyFragment3';
        var testKeyFragment4 = 'keyFragment2:keyFragment4';
        var testKeyFragment5 = 'keyFragment1:keyFragment5';
        var testKeyFragment6 = 'keyFragment2:keyFragment4:keyFragment6';
        var testValue1 = 'value1';
        var testValue2 = 'value2';
        var testValue3 = 'value3';
        var testValue4 = 'value4';
        var testValue5 = 'value5';
        var testValue6 = 'value6';
        var fragmentMap = new FragmentMap();
        fragmentMap.putFragment(testKeyFragment1, testValue1);
        fragmentMap.putFragment(testKeyFragment2, testValue2);
        fragmentMap.putFragment(testKeyFragment3, testValue3);
        fragmentMap.putFragment(testKeyFragment4, testValue4);
        fragmentMap.putFragment(testKeyFragment5, testValue5);
        fragmentMap.putFragment(testKeyFragment6, testValue6);


        // Run Test
        //-------------------------------------------------------------------------------

        var collectionResult1 = fragmentMap.get('keyFragment1');
        this.assertEqual(collectionResult1.getCount(), 1,
            "Assert three values found for key 'keyFragment1'");
        this.assertTrue(collectionResult1.contains(testValue1),
            "Assert value1 was contained in the result collection from get('keyFragment1')");

        var collectionResult2 = fragmentMap.get('keyFragment2:keyFragment4:keyFragment6');
        this.assertEqual(collectionResult2.getCount(), 3,
            "Assert three values found for key 'keyFragment2:keyFragment4:keyFragment6'");
        this.assertTrue(collectionResult2.contains(testValue2),
            "Assert value1 was contained in the result collection from get('keyFragment2:keyFragment4:keyFragment6')");
        this.assertTrue(collectionResult2.contains(testValue4),
            "Assert value3 was contained in the result collection from get('keyFragment2:keyFragment4:keyFragment6')");
        this.assertTrue(collectionResult2.contains(testValue6),
            "Assert value5 was contained in the result collection from get('keyFragment2:keyFragment4:keyFragment6')");


    }).with('@Test("FragmentMap putFragments/get test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = FragmentMapTest;
