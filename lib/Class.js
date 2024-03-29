/**
 * This work is based on...
 * Simple JavaScript Inheritance (http://ejohn.org/blog/simple-javascript-inheritance/)
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var TypeUtil = require('./TypeUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Class = {};

var Base = function() {};
Base._interfaces = [];
Base._superclass = null;

var BaseStatic = {
    getInterfaces: function() {
        return this._interfaces;
    },
    getSuperClass: function() {
        return this._superclass;
    }
};

var BasePrototype = {
    _constructor: function() {

    },
    getClass: function() {
        return this._class;
    }
};


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

Class.extending = false;


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * Use this to adapt classes built on other extension models to our own model.
 */
Class.adapt = function(_class, declaration) {
    Base.prototype = _class.prototype;
    var prototype = new Base();
    var newClass = function() {};
    for (var name in BasePrototype) {
        prototype[name] = BasePrototype[name];
    }
    prototype._constructor = function() {
        _class.apply(this, arguments);
    };
    newClass.prototype = prototype;
    newClass.constructor = newClass;
    Class.static(newClass, BaseStatic);
    newClass._interfaces = [];
    return Class.extend(newClass, declaration);
};

/**
 * @param {Object} declaration
 * @return {new:Base}
 */
Class.declare = function(declaration) {
    Base.prototype = BasePrototype;
    Class.static(Base, BaseStatic);
    return Class.extend(Base, declaration);
};

/**
 * @param {new:Base} _class
 * @param {Object} declaration
 * @return {new:Base}
 */
Class.extend = function(_class, declaration) {
    var _super = _class.prototype;
    Class.extending = true;
    var prototype = new _class();
    Class.extending = false;
    for (var name in declaration) {
        prototype[name] = TypeUtil.isFunction(prototype[name]) ?
            (function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, declaration[name]):
            declaration[name];
    }
    var newClass = function() {
        if (!Class.extending && this._constructor) {
            this._class = newClass;
            this._constructor.apply(this, arguments);
        }
    };
    newClass.prototype = prototype;
    newClass.constructor = newClass;
    Class.static(newClass, BaseStatic);
    newClass._interfaces = [];
    newClass._superclass = _class;
    _class.getInterfaces().forEach(function(_interface) {
        newClass._interfaces.push(_interface);
    });
    return newClass;
};

/**
 * @param {new:Base} _class
 * @param {new:Interface} _interface
 */
Class.implement = function(_class, _interface) {
    _class.getInterfaces().forEach(function(implementedInterface) {
        if (implementedInterface === _interface) {
            throw new Error("Interface " + implementedInterface + " has already been implemented by this class");
        }
    });
    for (var methodName in _interface.prototype) {
        if (!TypeUtil.isFunction(_class.prototype[methodName])) {
            throw new Error("Class " + _class + " does not implement interface method '" + methodName + "'");
        }
    }
    _class._interfaces.push(_interface);
};

/**
 * @param {*} value
 * @param {new:Base} _class
 * @return {boolean}
 */
Class.doesExtend = function(value, _class) {
    return value instanceof _class;
};

/**
 * @param {*} value
 * @param {new:Interface} _interface
 * @return {boolean}
 */
Class.doesImplement = function(value, _interface) {
    if (TypeUtil.isObject(value) && TypeUtil.isFunction(value.getClass)) {
        for (var i = 0, size = value.getClass().getInterfaces().length; i < size; i++) {
            var implementedInterface = value.getClass().getInterfaces()[i];
            var implementedInterfaceInstance = new implementedInterface();
            if (implementedInterfaceInstance instanceof _interface) {
                return true;
            }
        }
    }
    return false;
};

/**
 * @param {new:Base} _class
 * @param {Object} declaration
 */
Class.static = function(_class, declaration) {
    for (var name in declaration) {
        _class[name] = declaration[name];
    }
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Class;
