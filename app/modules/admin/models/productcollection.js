var mongoose = require('mongoose');
var db = mongoose.connection;

var productCollection = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productDescription: String,
    addedOn:  { type: Date, default: Date.now },
    editedOn: Date
});

module.exports = mongoose.model('productCollection', productCollection);
