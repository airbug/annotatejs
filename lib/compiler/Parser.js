//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var Character = require('./Character');
var LinkedList = require('../LinkedList');
var List = require('../List');
var Map = require('../Map');
var SourceTree = require('./SourceTree');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

//NOTE BRN: This class is only meant to be used once.

var Parser = Class.declare({

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

        this.sourceTree = new SourceTree();

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
     * @return {SourceTree}
     */
    getSourceTree: function() {
        return this.sourceTree;
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
     * @return {SourceTree}
     */
    parse: function(sourceString) {
        if (this.parseComplete) {
            throw new Error("Parser can only be used once");
        }
        this.characterList = Parser.generateCharacterList(sourceString);
        var _this = this;
        this.parserPassList.forEach(function(parserPass) {
            //TEST
            var startTime = (new Date()).getTime();
            parserPass.executePass(_this);
            var endTime = (new Date()).getTime();
            console.log(parserPass + " completed in " + (endTime - startTime) + "ms");
        });

        this.parseComplete = true;
        return this.sourceTree;
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

//TODO BRN: This might make more sense in a CharacterList class
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