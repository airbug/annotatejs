//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var FragmentMap = require('../../lib/FragmentMap');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 * This tests..
 * 1) Tests putting a value in the map to a key fragment
 * 2) Tests getting that value using getFragment
 */
var fragmentMapSimplePutFragmentGetFragmentTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testKeyFragment1 = 'keyFragment1';
        this.testKeyFragment2 = 'keyFragment2';
        this.testValue1 = 'value1';
        this.testValue2 = 'value2';
        this.fragmentMap = new FragmentMap();
        this.fragmentMap.putFragment(this.testKeyFragment1, this.testValue1);
        this.fragmentMap.putFragment(this.testKeyFragment2, this.testValue2);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertEqual(this.fragmentMap.getFragment(this.testKeyFragment1), this.testValue1,
            "Assert getFragment returns value1 for keyFragment1 ");
        test.assertEqual(this.fragmentMap.getFragment(this.testKeyFragment2), this.testValue2,
            "Assert getFragment returns value2 for keyFragment2 ");
    }
};
annotate(fragmentMapSimplePutFragmentGetFragmentTest).with(
    annotation("Test").params("FragmentMap simple putFragment/getFragment test")
);


/**
 * This tests..
 * 1) Tests putting multiple values in the map that match to different fragments of the key
 * 2) Tests getting the values using the different key fragments
 */
var fragmentMapPutFragmentsGetTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.testKeyFragment1 = 'keyFragment1';
        this.testKeyFragment2 = 'keyFragment2';
        this.testKeyFragment3 = 'keyFragment1:keyFragment3';
        this.testKeyFragment4 = 'keyFragment2:keyFragment4';
        this.testKeyFragment5 = 'keyFragment1:keyFragment5';
        this.testKeyFragment6 = 'keyFragment2:keyFragment4:keyFragment6';
        this.testValue1 = 'value1';
        this.testValue2 = 'value2';
        this.testValue3 = 'value3';
        this.testValue4 = 'value4';
        this.testValue5 = 'value5';
        this.testValue6 = 'value6';
        this.fragmentMap = new FragmentMap();
        this.fragmentMap.putFragment(this.testKeyFragment1, this.testValue1);
        this.fragmentMap.putFragment(this.testKeyFragment2, this.testValue2);
        this.fragmentMap.putFragment(this.testKeyFragment3, this.testValue3);
        this.fragmentMap.putFragment(this.testKeyFragment4, this.testValue4);
        this.fragmentMap.putFragment(this.testKeyFragment5, this.testValue5);
        this.fragmentMap.putFragment(this.testKeyFragment6, this.testValue6);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        var collectionResult1 = this.fragmentMap.get('keyFragment1');
        test.assertEqual(collectionResult1.getCount(), 1,
            "Assert three values found for key 'keyFragment1'");
        test.assertTrue(collectionResult1.contains(this.testValue1),
            "Assert value1 was contained in the result collection from get('keyFragment1')");

        var collectionResult2 = this.fragmentMap.get('keyFragment2:keyFragment4:keyFragment6');
        test.assertEqual(collectionResult2.getCount(), 3,
            "Assert three values found for key 'keyFragment2:keyFragment4:keyFragment6'");
        test.assertTrue(collectionResult2.contains(this.testValue2),
            "Assert value1 was contained in the result collection from get('keyFragment2:keyFragment4:keyFragment6')");
        test.assertTrue(collectionResult2.contains(this.testValue4),
            "Assert value3 was contained in the result collection from get('keyFragment2:keyFragment4:keyFragment6')");
        test.assertTrue(collectionResult2.contains(this.testValue6),
            "Assert value5 was contained in the result collection from get('keyFragment2:keyFragment4:keyFragment6')");
    }
};
annotate(fragmentMapPutFragmentsGetTest).with(
    annotation("Test").params("FragmentMap putFragments/get test")
);
