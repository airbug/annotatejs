
//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var PubSub = require('../PubSub');


//-------------------------------------------------------------------------------
// Static Instance
//-------------------------------------------------------------------------------

var CompilerChannel = new PubSub();


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = CompilerChannel;