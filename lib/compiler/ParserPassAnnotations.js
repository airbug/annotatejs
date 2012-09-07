//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotationNode = require('./nodes/AnnotationNode');
var BlockCommentToken = require('./tokens/BlockCommentToken');
var Class = require('../Class');
var ParserPass = require('./ParserPass');
var ParserPassBlocks = require('./ParserPassBlocks');
var ParserUtil = require('./ParserUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ParserPassAnnotations = Class.extend(ParserPass, {

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
         * @type {LinkedList}
         */
        this.blocksTokenList = null;

        /**
         * @private
         * @type {SourceTree}
         */
        this.sourceTree = null;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * Assumptions about this parser pass
     * 1) This parser pass runs after the ParserPassBlocks pass
     * TODO BRN: This pass should probably come much later as we build out more of the system. In order to properly
     * assign annotations, we need to know what code the annotation applies to.
     *
     * @param {Parser} parser
     */
    executePass: function(parser) {
        var characterList = parser.getCharacterList();
        if (!characterList.isEmpty()) {
            this.blocksTokenList = parser.retrieveTokenList(ParserPassBlocks.TOKEN_LIST_NAME);
            this.sourceTree = parser.getSourceTree();
            var _this = this;
            this.blocksTokenList.forEach(function(blockToken) {
                if (Class.doesExtend(blockToken, BlockCommentToken)) {
                    var characterIterator = blockToken.getCharacterListView().iterator();
                    while (characterIterator.hasNext()) {
                        switch (characterIterator.peekNext().getValue()) {
                            case '@':
                                var annotationNode = _this.parseAnnotationNode(characterIterator, characterList);
                                _this.sourceTree.addChildNode(annotationNode);
                                break;
                            default:
                                characterIterator.getNext();
                        }
                    }
                }
            });
        }
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    // NOTE BRN: For all parse functions, the iterator's current character is the character BEFORE the character of the
    // value the function is meant to parse. When a function is done parsing, it should leave itself on the last
    // character it parsed.

    /**
     * @private
     * @param {Iterator} characterIterator
     * @param {LinkedList} characterList
     * @return {AnnotationNode}
     */
    parseAnnotationNode: function(characterIterator, characterList) {
        var annotationToken = ParserUtil.parseAnnotationToken(characterIterator, characterList);
        return new AnnotationNode(annotationToken);
    }
});


//-------------------------------------------------------------------------------
// Static Values
//-------------------------------------------------------------------------------

ParserPassAnnotations.TOKEN_LIST_NAME = 'annotationsList';


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ParserPassAnnotations;
