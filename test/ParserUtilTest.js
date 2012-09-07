//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var annotate = require('../lib/Annotate').annotate;
var Parser = require('../lib/compiler/Parser');
var ParserUtil = require('../lib/compiler/ParserUtil');


//-------------------------------------------------------------------------------
// Declare Test
//-------------------------------------------------------------------------------

var ParserUtilTest = {
    /**
     *
     */
    parseIdentifierTokenTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var parseTests = [
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


        // Run Test
        //-------------------------------------------------------------------------------

        var _this = this;
        parseTests.forEach(function(parseTest) {
            var characterList = Parser.generateCharacterList(parseTest.value);
            var characterListIterator = characterList.iterator();
            var identifierToken = ParserUtil.parseIdentifierToken(characterListIterator, characterList);
            _this.assertEqual(identifierToken.getCharacterListViewAsString(), parseTest.expected,
                "Assert expected identifier '" + parseTest.expected + "' was parsed from string '" +
                    parseTest.value + "'.");
        });
    }).with('@Test("Parse identifier token test")'),

    //TODO BRN: Add assertThrows tests for identifier parse errors

    /**
     *
     */
    parseStringTokenTest: annotate(function() {

        // Setup Test
        //-------------------------------------------------------------------------------

        var parseTests = [
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


        // Run Test
        //-------------------------------------------------------------------------------

        var _this = this;
        parseTests.forEach(function(parseTest) {
            var characterList = Parser.generateCharacterList(parseTest.value);
            var characterListIterator = characterList.iterator();
            var token = ParserUtil.parseStringToken(characterListIterator, characterList);
            _this.assertEqual(token.getCharacterListViewAsString(), parseTest.expected,
                "Assert expected identifier '" + parseTest.expected + "' was parsed from string '" +
                    parseTest.value + "'.");
        });


    }).with('@Test("Parse string token test")')
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ParserUtilTest;
