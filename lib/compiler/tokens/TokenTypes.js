var TokenTypes = {};


// Characters
//-------------------------------------------------------------------------------

TokenTypes.Symbols = {
    AT: '@',
    BRACKET_CLOSE: ']',
    BRACKET_OPEN: '[',
    COLON: ':',
    COMMA: ',',
    CURLY_BRACE_CLOSE: '}',
    CURLY_BRACE_OPEN: '{',
    ESCAPE: '\\',
    PARENTHESIS_CLOSE: ')',
    PARENTHESIS_OPEN: '(',
    PERIOD: '.',
    DOUBLE_QUOTE: '"',
    SINGLE_QUOTE: '\'',
    SEMICOLON: ';'
};


// Values
//-------------------------------------------------------------------------------

TokenTypes.Values = {
    IDENTIFIER: 'identifier',
    STRING: 'string'
};

TokenTypes.Comments = {
    SINGLE_COMMENT: '//',
    MULTI_COMMENT_START: '/*',
    MULTI_COMMENT_END: '*/'
};

TokenTypes.Keywords = {
    BREAK: 'break',
    CASE: 'case',
    CATCH: 'catch',
    CONST: 'const',
    CONTINUE: 'continue',
    DEBUGGER: 'debugger',
    DEFAULT: 'default',
    DELETE: 'delete',
    DO: 'do',
    ELSE: 'else',
    FALSE: 'false',
    FINALLY: 'finally',
    FOR: 'for',
    FUNCTION: 'function',
    IF: 'if',
    IN: 'in',
    INSTANCEOF: 'instanceof',
    NEW: 'new',
    NULL: 'null',
    RETURN: 'return',
    SWITCH: 'switch',
    THROW: 'throw',
    TRUE: 'true',
    TRY: 'try',
    TYPEOF: 'typeof',
    UNDEFINED: 'undefined',
    VAR: 'var',
    VOID: 'void',
    WHILE: 'while',
    WITH: 'with'
};

TokenTypes.ReservedWords = {
    ABSTRACT: 'abstract',
    BOOLEAN: 'boolean',
    BYTE: 'byte',
    CHAR: 'char',
    CLASS: 'class',
    DOUBLE: 'double',
    ENUM: 'enum',
    EXPORT: 'export',
    EXTENDS: 'extends',
    FINAL: 'final',
    FLOAT: 'float',
    GOTO: 'goto',
    IMPLEMENTS: 'implements',
    IMPORT: 'import',
    INT: 'int',
    INTERFACE: 'interface',
    LONG: 'long',
    NATIVE: 'native',
    PACKAGE: 'package',
    PRIVATE: 'private',
    PROTECTED: 'protected',
    PUBLIC: 'public',
    SHORT: 'short',
    STATIC: 'static',
    SUPER: 'super',
    SYNCHRONIZED: 'synchronized',
    THROWS: 'throws',
    TRANSIENT: 'transient',
    VOLATILE: 'volatile'
};

TokenTypes.Operators = {
    ARITHMETIC_ADDITION: '+',
    ARITHMETIC_DIVISION: '/',
    ARITHMETIC_MODULUS: '%',
    ARITHMETIC_MULTIPLICATION: '*',
    ARITHMETIC_SUBTRACTION: '-',

    ASSIGNMENT_ASSIGNMENT: '=',
    ASSIGNMENT_ARITHMETIC_ADDITION: '+=',
    ASSIGNMENT_ARITHMETIC_SUBTRACTION: '-=',
    ASSIGNMENT_ARITHMETIC_DIVISION: '/=',
    ASSIGNMENT_ARITHMETIC_MULTIPLICATION: '*=',
    ASSIGNMENT_ARITHMETIC_MODULUS: '%=',
    ASSIGNMENT_BITWISE_AND: '&=',
    ASSIGNMENT_BITWISE_SHIFT_RIGHT: '>>=',
    ASSIGNMENT_BITWISE_SHIFT_LEFT: '<<=',
    ASSIGNMENT_BITWISE_SHIFT_RIGHT_NO_SIGN: '>>>=',
    ASSIGNMENT_BITWISE_OR: '|=',
    ASSIGNMENT_BITWISE_XOR: '^=',

    BITWISE_AND: '&',
    BITWISE_INVERT: '~',
    BITWISE_SHIFT_LEFT: '<<',
    BITWISE_SHIFT_RIGHT: '>>',
    BITWISE_SHIFT_RIGHT_NO_SIGN: '>>>',
    BITWISE_OR: '|',
    BITWISE_XOR: '^',

    COMPARISON_EQUAL: '==',
    COMPARISON_GREATER_THAN: '>',
    COMPARISON_GREATER_THAN_EQUAL: '>=',
    COMPARISON_IDENTICAL: '===',
    COMPARISON_LESS_THAN: '<',
    COMPARISON_LESS_THAN_EQUAL: '<=',
    COMPARISON_NOT_EQUAL: '!=',
    COMPARISON_NOT_IDENTICAL: '!==',

    INCREMENT_DECREMENT: '--',
    INCREMENT_INCREMENT: '++',

    LOGICAL_AND: '&&',
    LOGICAL_NOT: '!',
    LOGICAL_OR: '||',

    OTHER_TERNARY: '?'
};

TokenTypes.Whitespace = {
    CARRIAGE_RETURN: '\r',
    FORM_FEED: '\f',
    NEW_LINE: '\n',
    SPACE: ' ',
    TAB: '\t'
};


TokenTypes.Statements = {
    ANNOTATION: "annotation"
};

TokenTypes.Blocks = {
    ARGUMENTS: "block_arguments"
};

TokenTypes.Other = {
    ARGUMENT: "argument",
    EXPRESSION: "expression"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = TokenTypes;
