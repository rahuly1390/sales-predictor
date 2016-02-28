var mongoose = require('mongoose');
var db = mongoose.connection;


var storeCollection = new mongoose.Schema({
    catId: Number,
    storeName: String,
    storeAddress: String,
    storeType: String,
    addedOn:  { type: Date, default: Date.now },
    editedOn: Date
});

module.exports = mongoose.model('storeCollection', storeCollection);
