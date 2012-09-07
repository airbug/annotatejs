//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../Class');
var HashUtil = require('../HashUtil');
var TypeUtil = require('../TypeUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourceFile = Class.declare({

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(path) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.source = null;

        // Get the real path
        this.path = fs.realpathSync(path);
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    getPath: function() {
        return this.path;
    },

    getSource: function() {
        if (TypeUtil.isNull(this.source)) {
            this.loadSource();
        }
        return this.source;
    },


    //-------------------------------------------------------------------------------
    // IHashcode Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    hashcode: function() {
        if (!this._hashcode) {
            this._hashcode = "[SourceFile]" + HashUtil.hash(this.path);
        }
        return this._hashcode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     */
    loadSource: function() {
        var stat = fs.statSync(this.path);
        if (stat.isFile()) {
            if (this.path.lastIndexOf('.js') === this.path.length - 3) {
                this.source = fs.readFileSync(this.path, 'utf8');
            } else {
                throw new Error(this.path + " is not a javascript file");
            }
        } else {
            throw new Error(this.path + " is not a file");
        }
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SourceFile;
