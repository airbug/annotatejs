//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotationToken = require('./tokens/AnnotationToken');
var ArgumentToken = require('./tokens/ArgumentToken');
var BlockArgumentsToken = require('./tokens/BlockArgumentsToken');
var Class = require('../Class');
var ExpressionToken = require('./tokens/ExpressionToken');
var IdentifierToken = require('./tokens/IdentifierToken');
var List = require('../List');
var Obj = require('../Obj');
var ParseException = require('./ParseException');
var StringToken = require('./tokens/StringToken');
var Token = require('./tokens/Token');
var TokenTypes = require('./tokens/TokenTypes');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ParserUtil = Class.extend(Obj, {});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {LinkedListViewIterator} characterIterator
 * @param {LinkedListView} characterList
 * @return {AnnotationToken}
 */
ParserUtil.parseAnnotationToken = function(characterIterator, characterList) {
    var atSymbolToken = ParserUtil.parseSymbolToken(characterIterator, characterList, TokenTypes.Symbols.AT);
    var nameIdentifierToken = ParserUtil.parseIdentifierToken(characterIterator, characterList);
    var blockArgumentsToken = null;
    var firstCharacter = atSymbolToken.getCharacterListView().getFirst();
    var lastCharacter = nameIdentifierToken.getCharacterListView().getLast();
    var tokenList = new List();
    tokenList.add(atSymbolToken);
    tokenList.add(nameIdentifierToken);
    if (characterIterator.hasNext() && characterIterator.peekNext().getValue() === '(') {
        blockArgumentsToken = ParserUtil.parseBlockArgumentsToken(characterIterator, characterList);
        lastCharacter = blockArgumentsToken.getCharacterListView().getLast();
        tokenList.add(blockArgumentsToken);
    }
    return new AnnotationToken(characterList.view(firstCharacter, lastCharacter), tokenList);
};

ParserUtil.parseIdentifierToken = function(characterIterator, characterList) {
    if (characterIterator.hasNext()) {

        // NOTE BRN: Acceptable characters of an identifier are a-z, A-Z, 0-9, and _ First letter can be a-z, A-Z, and _

        var firstCharacterTest = new RegExp("[a-zA-Z_$]", "g");
        var firstCharacter = characterIterator.getNext();
        var lastCharacter = firstCharacter;
        if (firstCharacterTest.test(firstCharacter.getValue())) {
            while (characterIterator.hasNext()) {
                var nextCharacter = characterIterator.peekNext();
                var nextCharacterTest = new RegExp("[a-zA-Z0-9_$]", "g");
                if (!nextCharacterTest.test(nextCharacter.getValue())) {

                    // NOTE BRN: We should be done!

                    break;
                }

                // NOTE BRN: We only peeked at the last character. So we need to move it forward now

                lastCharacter = characterIterator.getNext();
            }
        } else {
            throw new ParseException("Parse Error: Identifier must start with a letter or an " +
                "underscore. Instead found '" + firstCharacter.getValue() + "'", firstCharacter.getLineNumber());
        }
        return new IdentifierToken(characterList.view(firstCharacter, lastCharacter));
    }
    throw new ParseException("Parse Error: Expecting identifier, found end of file.",
        characterIterator.getCurrent().getLineNumber());
};

ParserUtil.parseBlockArgumentsToken = function(characterIterator, characterList) {
    var parenthesisOpenSymbolToken = ParserUtil.parseSymbolToken(characterIterator, characterList,
        TokenTypes.Symbols.PARENTHESIS_OPEN);
    var parenthesisCloseSymbolToken = null;
    var tokenList = new List();
    tokenList.add(parenthesisOpenSymbolToken);
    if (characterIterator.hasNext()) {
        var nextCharacter = characterIterator.peekNext();

        //NOTE BRN: Check for the immediate close parenthesis. If one doesn't exist, then move to the while loop.

        if (nextCharacter.getValue() === ')') {
            parenthesisCloseSymbolToken = ParserUtil.parseSymbolToken(characterIterator, characterList,
                TokenTypes.Symbols.PARENTHESIS_CLOSE);
        } else {
            while (characterIterator.hasNext()) {
                var argumentToken = ParserUtil.parseArgumentToken(characterIterator, characterList);
                tokenList.add(argumentToken);
                nextCharacter = characterIterator.peekNext();
                if (nextCharacter.getValue() === ')') {
                    parenthesisCloseSymbolToken = ParserUtil.parseSymbolToken(characterIterator, characterList,
                        TokenTypes.Symbols.PARENTHESIS_CLOSE);
                    break;
                } else if (nextCharacter.getValue() === ',') {
                    var commaSymbolToken = ParserUtil.parseSymbolToken(characterIterator, characterList,
                        TokenTypes.Symbols.COMMA);
                    tokenList.add(commaSymbolToken);
                }
            }
        }
    }

    if (!parenthesisCloseSymbolToken) {
        throw new ParseException("Parse Error: Expecting ')'. Instead, found end of file.",
            characterIterator.getCurrent().getLineNumber());
    }
    tokenList.add(parenthesisCloseSymbolToken);
    var firstCharacter = parenthesisOpenSymbolToken.getCharacterListView().getFirst();
    var lastCharacter = parenthesisCloseSymbolToken.getCharacterListView().getLast();
    return new BlockArgumentsToken(characterList.view(firstCharacter, lastCharacter), tokenList);
};

ParserUtil.parseArgumentToken = function(characterIterator, characterList) {
    var tokenList = new List();
    var expressionToken = ParserUtil.parseExpressionToken(characterIterator, characterList);
    tokenList.add(expressionToken);
    var firstCharacter = expressionToken.getCharacterListView().getFirst();
    var lastCharacter = expressionToken.getCharacterListView().getLast();
    return new ArgumentToken(characterList.view(firstCharacter, lastCharacter), tokenList);
};

ParserUtil.parseExpressionToken = function(characterIterator, characterList) {
    var tokenList = new List();
    if (characterIterator.hasNext()) {
        var nextCharacter = characterIterator.peekNext();

        //TODO BRN: A LOT more cases to handle here than just the simple string based one. But this is all we need for now.
        //TODO BRN: This should probably loop since an expression can be multiple operators and values.
        var valueToken = null;
        if (nextCharacter.getValue() === '"') {
            valueToken = ParserUtil.parseStringToken(characterIterator, characterList);
            tokenList.add(valueToken);
        } else if (nextCharacter.getValue() === '\'') {
            valueToken = ParserUtil.parseStringToken(characterIterator, characterList);
            tokenList.add(valueToken);
        } else {
            throw new Error("Need to implement this type of expression. Not yet supported.");
        }

    } else {
        new ParseException("Parse Error: Expecting expression, found end of file.",
            characterIterator.getCurrent().getLineNumber());
    }
    var firstCharacter = tokenList.getAt(0).getCharacterListView().getFirst();
    var lastCharacter = tokenList.getAt(tokenList.getCount() - 1).getCharacterListView().getLast();
    return new ExpressionToken(characterList.view(firstCharacter, lastCharacter), tokenList);
};

ParserUtil.parseStringToken = function(characterIterator, characterList) {
    if (!characterIterator.hasNext()) {
        throw new ParseException("Parse Error: Expecting string. Instead, found end of file.",
            characterIterator.getCurrent().getValue())
    }
    var firstCharacter = characterIterator.getNext();
    if (firstCharacter.getValue() !== '"' && firstCharacter.getValue() !== '\'') {
        throw new ParseException("Parse Error: Expecting string. Instead found '" + firstCharacter.getValue() + "'",
            firstCharacter.getLineNumber())
    }
    var expectedValue = firstCharacter.getValue();
    if (firstCharacter.getValue() !== expectedValue) {
        throw new ParseException("Parse Error: Expecting symbol '" + expectedValue + "'. Instead found '" +
            firstCharacter.getValue() + "'.", characterIterator.getCurrent().getLineNumber());
    }
    var lastCharacter = null;
    while (characterIterator.hasNext()) {
        var nextCharacter = characterIterator.peekNext();

        if (nextCharacter.getValue() === expectedValue) {
            if (ParserUtil.validateNonEscapedStringCharacter(nextCharacter, characterList)) {
                lastCharacter = characterIterator.getNext();

                // NOTE BRN: We should be done!

                break;
            }
        } else if (nextCharacter.getValue() === '\n') {
            throw new ParseException("Expecting end of string. Instead, found end of line.",
                nextCharacter.getLineNumber());
        }

        // NOTE BRN: We only peeked at the last character. So we need to move it forward now

        characterIterator.getNext();
    }

    if (lastCharacter === null) {
        throw new ParseException("Parse Error: Expecting end of string. Instead, found '" + lastCharacter.getValue() +
            "'", lastCharacter.getLineNumber());
    }
    return new StringToken(characterList.view(firstCharacter, lastCharacter));
};

ParserUtil.parseNumberToken = function(characterIterator, characterList) {

};

ParserUtil.parseSymbolToken = function(characterIterator, characterList, tokenType) {
    var expectedValue = null;
    switch (tokenType) {
        case TokenTypes.Symbols.AT:
            expectedValue = '@';
            break;
        case TokenTypes.Symbols.BRACKET_CLOSE:
            expectedValue = ']';
            break;
        case TokenTypes.Symbols.BRACKET_OPEN:
            expectedValue = '[';
            break;
        case TokenTypes.Symbols.COLON:
            expectedValue = ':';
            break;
        case TokenTypes.Symbols.COMMA:
            expectedValue = ',';
            break;
        case TokenTypes.Symbols.CURLY_BRACE_CLOSE:
            expectedValue = '}';
            break;
        case TokenTypes.Symbols.CURLY_BRACE_OPEN:
            expectedValue = '{';
            break;
        case TokenTypes.Symbols.DOUBLE_QUOTE:
            expectedValue = '"';
            break;
        case TokenTypes.Symbols.ESCAPE:
            expectedValue = '\\';
            break;
        case TokenTypes.Symbols.PARENTHESIS_CLOSE:
            expectedValue = ')';
            break;
        case TokenTypes.Symbols.PARENTHESIS_OPEN:
            expectedValue = '(';
            break;
        case TokenTypes.Symbols.PERIOD:
            expectedValue = '.';
            break;
        case TokenTypes.Symbols.SEMICOLON:
            expectedValue = ';';
            break;
        case TokenTypes.Symbols.SINGLE_QUOTE:
            expectedValue = '\'';
            break;
        default:
            throw new Error("Unknown token type");
    }
    if (!characterIterator.hasNext()) {
        throw new ParseException("Parse Error: Expecting symbol '" + expectedValue + "'. Instead found end of file.",
            characterIterator.getCurrent().getValue())
    }
    var nextCharacter = characterIterator.getNext();
    if (nextCharacter.getValue() !== expectedValue) {
        throw new ParseException("Parse Error: Expecting symbol '" + expectedValue + "'. Instead found '" +
            nextCharacter.getValue() + "'.", characterIterator.getCurrent().getLineNumber());
    }
    return new Token(tokenType, characterList.view(nextCharacter, nextCharacter));
};

/**
 * @param {Character} character
 * @param {LinkedList<Character>} characterList
 * @return {boolean}
 */
ParserUtil.validateNonEscapedStringCharacter = function(character, characterList) {
    var characterIterator = characterList.iteratorFrom(character);
    var iterationCount = 0;
    while (true) {
        iterationCount++;
        var previousCharacter = characterIterator.getPrevious();
        if (previousCharacter.getValue() !== '\\') {

            // NOTE BRN: This is a little tricky. If we have an even number of escape characters then we are not
            // escaped. If we have an odd number then we ARE escaped.
            //    \\\" <-- is escaped
            //    \\" <-- is not escaped

            var remainder = (iterationCount - 1) % 2;
            var isEven = (remainder === 0);

            // NOTE BRN: Rewind the iterations.

            while (iterationCount > 0) {
                iterationCount--;
                characterIterator.getNext();
            }
            return isEven;
        }
    }
};

//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ParserUtil;
