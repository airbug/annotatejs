//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../lib/Annotate');
var IdGenerator = require('../../lib/IdGenerator');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------


/**
 * This tests...
 * 1) Generating a new id is always a different id.
 */
var generateIdTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.id1 = IdGenerator.generateId();
        this.id2 = IdGenerator.generateId();
        this.id3 = IdGenerator.generateId();
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        test.assertNotEqual(this.id1, this.id2,
            "Assert the first id generated and the second id generated are not equal");
        test.assertNotEqual(this.id2, this.id3,
            "Assert the second id generated and the third id generated are not equal");
        test.assertNotEqual(this.id1, this.id3,
            "Assert the third id generated and the first id generated are not equal");
    }
};
annotate(generateIdTest).with(
    annotation("Test").params("IdGenerator generate id test")
);
