//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var Character = require('./Character');
var LinkedList = require('../LinkedList');
var List = require('../List');
var Map = require('../Map');
var Obj = require('../Obj');
var ParseException = require('./ParseException');
var SourceDocument = require('./source/SourceDocument');
var SourceFile = require('./source/SourceFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

//NOTE BRN: This class is only meant to be used once.


// TODO BRN: This Parser should be broken up in to two pieces. The first part monitors the source files and generates
// a diff between the old text and the new text. These diffs are then broken down in to character change sets.
// Character change sets include insertions and deletions (Having only these two keeps it very simple and also keeps it
// inline with the google docs style insertion and deletion of characters in a document). These changes are then looked
// up in the SourceDocument to discover which SourceNodes they affected. The character changes are applied and the
// affected nodes are reparsed. As the nodes are reparsed, Change instances are generated representing what changed
// in the SourceDocument. These Change instances are then sent to the Compiler where the Compiler applies the changes
// one by one and allows each micro change to the processed by the different modules.

var Parser = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {LinkedList<Character>}
         */
        this.characterList = null;

        /**
         * @private
         * @type {boolean}
         */
        this.parseComplete = false;

        /**
         * @private
         * @type {List<ParserPass>}
         */
        this.parserPassList = new List();

        /**
         * @private
         * @type {SourceDocument}
         */
        this.sourceDocument = null;

        /**
         * @private
         * @type {Map<string, LinkedList<Token>>}
         */
        this.tokenListMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {LinkedList<Character>}
     */
    getCharacterList: function() {
        return this.characterList;
    },

    /**
     * @return {SourceDocument}
     */
    getSourceDocument: function() {
        return this.sourceDocument;
    },


    //-------------------------------------------------------------------------------
    // Public Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {ParserPass} parserPass
     */
    addParserPass: function(parserPass) {
        this.parserPassList.add(parserPass);
    },

    /**
     * @param {string} listName
     * @return {LinkedList}
     */
    createTokenList: function(listName) {
        var tokenList = new LinkedList();
        this.tokenListMap.put(listName, tokenList);
        return tokenList;
    },

    /**
     * @param {string} listName
     * @return {LinkedList<Token>}
     */
    retrieveTokenList: function(listName) {
        return this.tokenListMap.get(listName);
    },

    //TODO BRN: This is how our new text parsing should behave.
    //
    // - Source and TokenContainers are really the same thing. So if we merge those concepts, the changes generated are
    // really changes to the SourceDocument.. which allows the compiler to continue behaving the way it is already
    // - We should remove the CharacterList concepts because it takes a lot of time to create the CharacterLists at the
    // start of parsing.
    // - instead we should use basic strings and use standard index references for identifying our location in the
    // document we are parsing
    // - To simplify we should also remove the ParserPass concept and use a simpler one pass parse
    // - To further speed up parsing, we should delegate the generation of change sets to cluster.workers.
    // - These cluster.workers would send the change sets to the compiler in json format. The compiler would then
    // convert them back to change sets and process them in the compiler. The compiler would live on the master thread.
    // - The master would have one complete instance of the SourceDocument. Each worker would have Script instances
    // for the scripts that the worker monitors for changes. This creates double the memory, but allows us to
    // break up the parsing between multiple threads which is a win since parsing is the slowest part of compilation.

    /**
     * @return {SourceDocument}
     */
    parse: function() {
        if (this.parseComplete) {
            throw new Error("Parser can only be used once");
        }
        this.characterList = Parser.generateCharacterList(this.sourceDocument.getSource());
        var _this = this;
        this.parserPassList.forEach(function(parserPass) {

            //TEST
            var startTime = (new Date()).getTime();
            try {
                parserPass.executePass(_this);
            } catch (e) {
                if (Class.doesExtend(e, ParseException)) {
                    var sourceOrigin = _this.sourceDocument.getSourceOrigin();
                    if (Class.doesExtend(sourceOrigin, SourceFile)) {
                        console.log(sourceOrigin.getFilePath() + ":" + e.getLineNumber() + "\n" + e.getMessage());
                    }
                    throw new Error();
                }
                throw e;
            }

            //TEST
            var endTime = (new Date()).getTime();
            console.log(parserPass + " completed in " + (endTime - startTime) + "ms");

        });
        this.parseComplete = true;
        return this.sourceDocument;
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

//TODO BRN: This might make more sense in a CharacterList class instead of the Parser class
/**
 * @static
 * @param {string} sourceString
 * @return {LinkedList}
 */
Parser.generateCharacterList = function(sourceString) {
    var characterList = new LinkedList();
    var lineNumber = 1;
    for (var i = 0, size = sourceString.length; i < size; i++) {
        var characterString = sourceString.charAt(i);

        //TODO BRN: This doesn't work for lineNumbers. When new Characters are injected between others we could easily
        // inject new line ending characters which would throw off this count. Instead this should respect the LinkedList
        // model and traverse the list counting the number of line endings this character is away from the start. This
        // should be performed on demand when the lineNumber is needed. Thankfully, that shouldn't be too frequently.

        var characterObject = new Character(characterString, lineNumber);
        characterList.addBack(characterObject);
        if (characterObject.getValue() === '\n') {
            lineNumber++;
        }
    }
    return characterList;
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Parser;
