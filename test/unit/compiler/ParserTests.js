//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../lib/Annotate');
var Character = require('../../../lib/compiler/Character');
var Class = require('../../../lib/Class');
var Parser = require('../../../lib/compiler/Parser');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var annotate = Annotate.annotate;
var annotation = Annotate.annotation;


//-------------------------------------------------------------------------------
// Declare Tests
//-------------------------------------------------------------------------------

/**
 *
 */
var generateCharacterListTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.characterString = "abcdef";
        this.characterList = Parser.generateCharacterList(this.characterString);
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        for (var i = 0, size = this.characterString.length; i < size; i++) {
            var char = this.characterString.substr(i, 1);
            var characterObject = this.characterList.getAt(i);
            test.assertTrue(Class.doesExtend(characterObject, Character),
                "Assert character in character list is an instance of Character");
            test.assertEqual(char, characterObject.getValue(),
                "Assert character from string and value of Character object match");
        }
    }
};
annotate(generateCharacterListTest).with(
    annotation("Test").params("Generate character list test")
);
