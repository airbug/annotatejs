//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Character = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(value, lineNumber) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.lineNumber = lineNumber;

        this.type = Character.determineType(value);

        this.value = value;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    getLineNumber: function() {
        return this.lineNumber;
    },

    getType: function() {
        return this.type;
    },

    getValue: function() {
        return this.value;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    toString: function() {
        var output = "[Character] {\n";
        output += "\tvalue :" + this.value + ",\n";
        output += "\ttype: " + this.type + "\n";
        output += "}\n";
        return output;
    }


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

Character.Types = {
    LETTER: 'character_letter',
    NUMBER: 'character_number',
    SYMBOL: 'character_symbol',
    WHITESPACE: 'character_whitespace'
};


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

Character.determineType = function(character) {

    var characterTypeLookupTable = {
        // Letters
        'a': Character.Types.LETTER,
        'b': Character.Types.LETTER,
        'c': Character.Types.LETTER,
        'd': Character.Types.LETTER,
        'e': Character.Types.LETTER,
        'f': Character.Types.LETTER,
        'g': Character.Types.LETTER,
        'h': Character.Types.LETTER,
        'i': Character.Types.LETTER,
        'j': Character.Types.LETTER,
        'k': Character.Types.LETTER,
        'l': Character.Types.LETTER,
        'm': Character.Types.LETTER,
        'n': Character.Types.LETTER,
        'o': Character.Types.LETTER,
        'p': Character.Types.LETTER,
        'q': Character.Types.LETTER,
        'r': Character.Types.LETTER,
        's': Character.Types.LETTER,
        't': Character.Types.LETTER,
        'u': Character.Types.LETTER,
        'v': Character.Types.LETTER,
        'w': Character.Types.LETTER,
        'x': Character.Types.LETTER,
        'y': Character.Types.LETTER,
        'z': Character.Types.LETTER,
        'A': Character.Types.LETTER,
        'B': Character.Types.LETTER,
        'C': Character.Types.LETTER,
        'D': Character.Types.LETTER,
        'E': Character.Types.LETTER,
        'F': Character.Types.LETTER,
        'G': Character.Types.LETTER,
        'H': Character.Types.LETTER,
        'I': Character.Types.LETTER,
        'J': Character.Types.LETTER,
        'K': Character.Types.LETTER,
        'L': Character.Types.LETTER,
        'M': Character.Types.LETTER,
        'N': Character.Types.LETTER,
        'O': Character.Types.LETTER,
        'P': Character.Types.LETTER,
        'Q': Character.Types.LETTER,
        'R': Character.Types.LETTER,
        'S': Character.Types.LETTER,
        'T': Character.Types.LETTER,
        'U': Character.Types.LETTER,
        'V': Character.Types.LETTER,
        'W': Character.Types.LETTER,
        'X': Character.Types.LETTER,
        'Y': Character.Types.LETTER,
        'Z': Character.Types.LETTER,

        // Numbers
        '0': Character.Types.NUMBER,
        '1': Character.Types.NUMBER,
        '2': Character.Types.NUMBER,
        '3': Character.Types.NUMBER,
        '4': Character.Types.NUMBER,
        '5': Character.Types.NUMBER,
        '6': Character.Types.NUMBER,
        '7': Character.Types.NUMBER,
        '8': Character.Types.NUMBER,
        '9': Character.Types.NUMBER,

        // Symbols
        '~': Character.Types.SYMBOL,
        '`': Character.Types.SYMBOL,
        '!': Character.Types.SYMBOL,
        '@': Character.Types.SYMBOL,
        '#': Character.Types.SYMBOL,
        '$': Character.Types.SYMBOL,
        '%': Character.Types.SYMBOL,
        '^': Character.Types.SYMBOL,
        '&': Character.Types.SYMBOL,
        '*': Character.Types.SYMBOL,
        '(': Character.Types.SYMBOL,
        ')': Character.Types.SYMBOL,
        '-': Character.Types.SYMBOL,
        '_': Character.Types.SYMBOL,
        '+': Character.Types.SYMBOL,
        '=': Character.Types.SYMBOL,
        '{': Character.Types.SYMBOL,
        '}': Character.Types.SYMBOL,
        '[': Character.Types.SYMBOL,
        ']': Character.Types.SYMBOL,
        '|': Character.Types.SYMBOL,
        '\\': Character.Types.SYMBOL,
        ':': Character.Types.SYMBOL,
        ';': Character.Types.SYMBOL,
        '"': Character.Types.SYMBOL,
        '\'': Character.Types.SYMBOL,
        '<': Character.Types.SYMBOL,
        ',': Character.Types.SYMBOL,
        '>': Character.Types.SYMBOL,
        '.': Character.Types.SYMBOL,
        '?': Character.Types.SYMBOL,
        '/': Character.Types.SYMBOL,

        // Whitespace
        '\r': Character.Types.WHITESPACE,
        '\f': Character.Types.WHITESPACE,
        '\n': Character.Types.WHITESPACE,
        ' ': Character.Types.WHITESPACE,
        '\t': Character.Types.WHITESPACE
    };

    return characterTypeLookupTable[character];
};

//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Character;
