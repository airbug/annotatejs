//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var BlockCodeToken = require('./token/BlockCodeToken');
var BlockCommentToken = require('./token/BlockCommentToken');
var BlockStringToken = require('./token/BlockStringToken');
var Class = require('../Class');
var List = require('../List');
var ParseException = require('./ParseException');
var ParserPass = require('./ParserPass');
var ParserUtil = require('./ParserUtil');
var TokenTypes = require('./token/TokenTypes');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ParserPassBlocks = Class.extend(ParserPass, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.characterIterator = null;

        this.characterList = null;

        this.tokenList = null;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * Assumptions about this parser pass
     * 1) This is the first parser pass to run.
     * 2) The tokenList is empty
     * 3) The sourceDocument is empty
     *
     * Parsing strategy of this pass
     * 1) scan till the next comment start or string start [//, /*] OR [',"]
     * 2) place all characters between the end of the last comment/string and the start of the recently found one.
     *     b) if we find a //
     *         A) scan till the next line ending [\n]
     *         B) create a new BlockCommentToken for the TokenList
     *     b) if we find a /*
     *         A) scan till the next * /
     *
     * @param {Parser} parser
     */
    executePass: function(parser) {
        this.characterList = parser.getCharacterList();
        this.tokenList = parser.createTokenList(ParserPassBlocks.TOKEN_LIST_NAME);

        //NOTE BRN: If the character list is empty then we have no code. Just bail out if that's the case.

        if (!this.characterList.isEmpty()) {
            this.characterIterator = this.characterList.iterator();
            var firstPass = true;
            var goalPost = null;

            while (true) {
                var lastGoalPost = goalPost;
                var startPost = this.findNextStartPost();

                // NOTE BRN: If we have a startPost it means we found a string/comment.

                if (startPost) {
                    if (firstPass) {

                        // NOTE BRN: Mark all of the code from the first character to the character before the first
                        // post as a code block. If there is no character before the first post then there is no code
                        // before the first post.

                        if (startPost.previousCharacter) {
                            this.markCodeBlock(this.characterList.getFirst(), startPost.previousCharacter);
                        }
                    } else {

                        // NOTE BRN: We only want to mark a code block if the next character of the lastGoalPost does
                        // not match the post character of the new start post. If they do match it means there is no
                        // code between a string/comment and another string/comment.

                        if (lastGoalPost.nextCharacter !== startPost.postCharacter) {
                            this.markCodeBlock(lastGoalPost.nextCharacter, startPost.previousCharacter);
                        }
                    }
                    switch (startPost.type) {
                        case TokenTypes.Comments.SINGLE_COMMENT:
                            goalPost = this.findNextGoalPost(TokenTypes.Whitespace.NEW_LINE);
                            break;
                        case TokenTypes.Comments.MULTI_COMMENT_START:
                            goalPost = this.findNextGoalPost(TokenTypes.Comments.MULTI_COMMENT_END);
                            break;
                        case TokenTypes.Symbols.DOUBLE_QUOTE:
                            goalPost = this.findNextGoalPost(TokenTypes.Symbols.DOUBLE_QUOTE);
                            break;
                        case TokenTypes.Symbols.SINGLE_QUOTE:
                            goalPost = this.findNextGoalPost(TokenTypes.Symbols.SINGLE_QUOTE);
                            break;
                    }

                    // NOTE BRN: If we find a goal post, then we know we've found the end of our token. If we don't
                    // then we have a parse error.

                    if (goalPost) {
                        switch (goalPost.type) {
                            case TokenTypes.Whitespace.NEW_LINE:
                                this.markCommentBlock(startPost.postCharacter, goalPost.postCharacter,
                                    BlockCommentToken.CommentType.SINGLE_LINE);
                                break;
                            case TokenTypes.Comments.MULTI_COMMENT_END:
                                this.markCommentBlock(startPost.postCharacter, goalPost.postCharacter,
                                    BlockCommentToken.CommentType.SINGLE_LINE);
                                break;
                            case TokenTypes.Symbols.DOUBLE_QUOTE:
                                this.markStringBlock(startPost.postCharacter, goalPost.postCharacter,
                                    BlockStringToken.StringType.DOUBLE_QUOTE);
                                break;
                            case TokenTypes.Symbols.SINGLE_QUOTE:
                                this.markStringBlock(startPost.postCharacter, goalPost.postCharacter,
                                    BlockStringToken.StringType.SINGLE_QUOTE);
                                break;
                        }
                    } else {
                        //TODO BRN: Need to add info about the parse error.
                        throw new ParseException("Parse Error", startPost.postCharacter.getLineNumber());
                    }
                } else {

                    // NOTE BRN: If it was the first pass and we didn't find anything then process the whole thing as
                    // one big code block. Otherwise mark everything from the goalPost to the last character as a code
                    // block

                    if (firstPass) {
                        this.markCodeBlock(this.characterList.getFirst(), this.characterList.getLast());
                    } else {

                        // NOTE BRN: If we don't have a next character it means we ended on a comment or string. In that
                        // case, we don't have a code block at the end.

                        if (goalPost.nextCharacter) {
                            this.markCodeBlock(goalPost.nextCharacter, this.characterList.getLast());
                        }
                    }
                    break;
                }
            }
        }
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    findNextGoalPost: function(type) {
        var goalPost = {
            type: null,
            postCharacter: null,
            nextCharacter: null
        };
        var postCharacter = undefined;
        var parserPass = this;
        switch (type) {
            case TokenTypes.Whitespace.NEW_LINE:
                postCharacter = this.characterIterator.find(function(character) {
                    if (character.getValue() === '\n') {
                        this.type = TokenTypes.Whitespace.NEW_LINE;
                        return true;
                    }
                    return false;
                }, goalPost);
                break;
            case TokenTypes.Comments.MULTI_COMMENT_END:
                postCharacter = this.characterIterator.find(function(character, iterator) {
                    if (character.getValue() === '*') {
                        if (iterator.hasNext()) {
                            var nextCharacter = iterator.peekNext();
                            if (nextCharacter.getValue() === '/') {
                                this.type = TokenTypes.Comments.MULTI_COMMENT_END;
                                return true;
                            }
                        }
                    }
                    return false;
                }, goalPost);
                break;
            case TokenTypes.Symbols.DOUBLE_QUOTE:
                postCharacter = this.characterIterator.find(function(character, iterator) {
                    if (character.getValue() === '"') {
                        if (ParserUtil.validateNonEscapedStringCharacter(character, parserPass.characterList)) {
                            this.type = TokenTypes.Symbols.DOUBLE_QUOTE;
                            return true;
                        }
                    }
                    return false;
                }, goalPost);
                break;
            case TokenTypes.Symbols.SINGLE_QUOTE:
                postCharacter = this.characterIterator.find(function(character, iterator) {
                    if (character.getValue() === '\'') {
                        if (ParserUtil.validateNonEscapedStringCharacter(character, parserPass.characterList)) {
                            this.type = TokenTypes.Symbols.SINGLE_QUOTE;
                            return true;
                        }
                    }
                    return false;
                }, goalPost);
                break;
        }

        // NOTE BRN: If the post character is undefined it means we didn't find anything. In that case return undefined.

        if (postCharacter === undefined) {
             return undefined;
        }
        goalPost.postCharacter = postCharacter;
        if (this.characterIterator.hasNext()) {
            goalPost.nextCharacter = this.characterIterator.peekNext();
        }
        return goalPost;
    },

    findNextStartPost: function() {
        var startPost = {
            type: null,
            postCharacter: null,
            previousCharacter: null
        };
        var postCharacter = this.characterIterator.find(function(character, iterator) {
            switch (character.getValue()) {
                case '/':
                    if (iterator.hasNext()) {
                        var nextCharacter = iterator.peekNext();
                        if (nextCharacter.getValue() === '/') {
                            this.type = TokenTypes.Comments.SINGLE_COMMENT;
                            return true;
                        } else if (nextCharacter.getValue() === '*') {
                            this.type = TokenTypes.Comments.MULTI_COMMENT_START;
                            return true;
                        }
                    }
                    break;
                case '"':
                    this.type = TokenTypes.Symbols.DOUBLE_QUOTE;
                    return true;
                    break;
                case '\'':
                    this.type = TokenTypes.Symbols.SINGLE_QUOTE;
                    return true;
                    break;
            }
            return false;
        }, startPost);

        // NOTE BRN: If the post character is undefined it means we didn't find anything. In that case return undefined.

        if (postCharacter === undefined) {
            return undefined;
        }
        startPost.postCharacter = postCharacter;
        if (this.characterIterator.hasPrevious()) {
            startPost.previousCharacter = this.characterIterator.peekPrevious();
        }
        return startPost;
    },

    /**
     * This function creates a BlockCodeToken and appends it to the tokenList. The token starts at the start character
     * and ends at the endCharacter.
     * @param {Character} startCharacter
     * @param {Character} endCharacter
     */
    markCodeBlock: function(startCharacter, endCharacter) {
        var characterListView = this.characterList.view(startCharacter, endCharacter);
        var blockCodeToken = new BlockCodeToken(characterListView);
        this.tokenList.addBack(blockCodeToken);
    },

    /**
     * This function creates a BlockCommentToken and appends it to the tokenList. The token starts at the start
     * character and ends at the endCharacter.
     * @param {Character} startCharacter
     * @param {Character} endCharacter
     * @param {string} commentType
     */
    markCommentBlock: function(startCharacter, endCharacter, commentType) {
        var characterListView = this.characterList.view(startCharacter, endCharacter);
        var blockCommentToken = new BlockCommentToken(characterListView, commentType);
        this.tokenList.addBack(blockCommentToken);
    },

    /**
     * This function creates a BlockStringToken and appends it to the tokenList. The token starts at the start
     * character and ends at the endCharacter.
     * @param {Character} startCharacter
     * @param {Character} endCharacter
     * @param {string} stringType
     */
    markStringBlock: function(startCharacter, endCharacter, stringType) {
        var characterListView = this.characterList.view(startCharacter, endCharacter);
        var blockStringToken = new BlockStringToken(characterListView, stringType);
        this.tokenList.addBack(blockStringToken);
    }
});


//-------------------------------------------------------------------------------
// Static Values
//-------------------------------------------------------------------------------

ParserPassBlocks.TOKEN_LIST_NAME = "blocksList";


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ParserPassBlocks;
