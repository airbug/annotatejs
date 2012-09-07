//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

// NOTE BRN: Object depends on HashUtil for generating it's hashcode.. thus HashUtil cannot depend on Object. Instead HashUtil should use an interface to determine if something implements the hashcode function.
var HashUtil = require('./HashUtil');
var IdGenerator = require('./IdGenerator');
var IHashcode = require('./IHashcode');
var TypeUtil = require('./TypeUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Obj = function() {};


//-------------------------------------------------------------------------------
// Constructor
//-------------------------------------------------------------------------------

Obj.prototype._constructor = function() {

    //-------------------------------------------------------------------------------
    // Declare Variables
    //-------------------------------------------------------------------------------

    // NOTE BRN: This value is set by the Class system during the class constructor.

    this._class = null;

    this._hashcode = undefined;

    // NOTE BRN: This value is set during the call to IdGenerator.injectId(). We just put this here for clarity's sake.

    this._internalId;

    IdGenerator.injectId(this);
};

//-------------------------------------------------------------------------------
// Getters and Setters
//-------------------------------------------------------------------------------

Obj.prototype.getClass = function() {
    return this._class;
};

Obj.prototype.getId = function() {
    return this._internalId;
};


//-------------------------------------------------------------------------------
// Class Methods
//-------------------------------------------------------------------------------

Obj.prototype.clone = function() {
    var classObject = this.getClass();
    var cloneObject = new classObject();
    for (var key in this) {
        var value = this[key];
        if (!TypeUtil.isFunction(value)) {
            cloneObject[key] = value;
        }
    }
    return cloneObject;
};

Obj.prototype.equals = function(value) {
    if (Class.doesExtend(value, Obj)) {
        return (value._internalId === this._internalId);
    }
    return false;
};

/**
 * @return {string}
 */
Obj.prototype.hashcode = function() {
    if (!this._hashcode) {
        this._hashcode = HashUtil.hash(this);
    }
    return this._hashcode;
};



//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

Obj._interfaces = [
    IHashcode
];

Obj.getInterfaces = function() {
    return Obj._interfaces;
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Obj;
