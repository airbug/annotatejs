//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Annotate = require('../../../lib/Annotate');
var Parser = require('../../../lib/compiler/Parser');
var ParserUtil = require('../../../lib/compiler/ParserUtil');


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
var parseIdentifierTokenTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.parseTests = [
            {
                value: "a",
                expected: "a"
            },
            {
                value: "_",
                expected: "_"
            },
            {
                value: "$",
                expected: "$"
            },
            {
                value: "abcdef",
                expected: "abcdef"
            },
            {
                value: "_abcdef",
                expected: "_abcdef"
            },
            {
                value: "abcdef123",
                expected: "abcdef123"
            },
            {
                value: "_abcdef123",
                expected: "_abcdef123"
            },
            {
                value: "_123",
                expected: "_123"
            },
            {
                value: "_abc!def",
                expected: "_abc"
            },
            {
                value: "_abc def",
                expected: "_abc"
            }
        ];
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        this.parseTests.forEach(function(parseTest) {
            var characterList = Parser.generateCharacterList(parseTest.value);
            var characterListIterator = characterList.iterator();
            var identifierToken = ParserUtil.parseIdentifierToken(characterListIterator, characterList);
            test.assertEqual(identifierToken.getCharacterListViewAsString(), parseTest.expected,
                "Assert expected identifier '" + parseTest.expected + "' was parsed from string '" +
                    parseTest.value + "'.");
        });
    }
};
annotate(parseIdentifierTokenTest).with(
    annotation("Test").params("Parse identifier token test")
);


//TODO BRN: Add assertThrows tests for identifier parse errors

/**
 *
 */
var parseStringTokenTest = {

    // Setup Test
    //-------------------------------------------------------------------------------

    setup: function() {
        this.parseTests = [
            {
                value: "'abc'",
                expected: "'abc'"
            },
            {
                value: "\"abc\"",
                expected: "\"abc\""
            },
            {
                value: "'_1234%$#0934!#'",
                expected: "'_1234%$#0934!#'"
            },
            {
                value: "\"_1234%$#0934!#\"",
                expected: "\"_1234%$#0934!#\""
            },
            {
                value: "''",
                expected: "''"
            },
            {
                value: "\"\"",
                expected: "\"\""
            },
            {
                value: "'abc\\'def'",
                expected: "'abc\\'def'"
            },
            {
                value: "\"abc\\'def\"",
                expected: "\"abc\\'def\""
            }
        ];
    },


    // Run Test
    //-------------------------------------------------------------------------------

    test: function(test) {
        this.parseTests.forEach(function(parseTest) {
            var characterList = Parser.generateCharacterList(parseTest.value);
            var characterListIterator = characterList.iterator();
            var token = ParserUtil.parseStringToken(characterListIterator, characterList);
            test.assertEqual(token.getCharacterListViewAsString(), parseTest.expected,
                "Assert expected identifier '" + parseTest.expected + "' was parsed from string '" +
                    parseTest.value + "'.");
        });
    }
};
annotate(parseStringTokenTest).with(
    annotation("Test").params("Parse string token test")
);
