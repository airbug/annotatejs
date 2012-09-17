//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var Character = require('./Character');
var LinkedList = require('../LinkedList');
var List = require('../List');
var Map = require('../Map');
var Obj = require('../Obj');
var SourceDocument = require('./source/SourceDocument');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

//NOTE BRN: This class is only meant to be used once.

var Parser = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.characterList = null;

        this.parseComplete = false;

        this.parserPassList = new List();

        this.sourceDocument = null;

        this.tokenListMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {LinkedList}
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
     * @return {LinkedList}
     */
    retrieveTokenList: function(listName) {
        return this.tokenListMap.get(listName);
    },

    /**
     * @return {SourceDocument}
     */
    parse: function() {
        if (this.parseComplete) {
            throw new Error("Parser can only be used once");
        }
        this.characterList = Parser.generateCharacterList(this.sourceDocument.getSourceFile().getSource());
        var _this = this;
        this.parserPassList.forEach(function(parserPass) {

            //TEST
            var startTime = (new Date()).getTime();

            parserPass.executePass(_this);

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
