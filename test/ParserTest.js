//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Character = require('../lib/compiler/Character');
var Class = require('../lib/Class');
var Parser = require('../lib/compiler/Parser');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var ParserTest = {
    /**
     *
     */
    generateCharacterListTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var characterString = "abcdef";
        var characterList = Parser.generateCharacterList(characterString);


        // Run Test
        //-------------------------------------------------------------------------------

        for (var i = 0, size = characterString.length; i < size; i++) {
            var char = characterString.substr(i, 1);
            var characterObject = characterList.getAt(i);
            this.assertTrue(Class.doesExtend(characterObject, Character),
                "Assert character in character list is an instance of Character");
            this.assertEqual(char, characterObject.getValue(),
                "Assert character from string and value of Character object match");
        }

    }).with('@Test("Generate character list test")')


};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ParserTest;
