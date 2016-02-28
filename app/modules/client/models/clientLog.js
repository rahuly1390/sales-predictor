var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
});

var clientLog = new mongoose.Schema({
    role: Number,
    userId: Number,
    date: Date,
    level: Number,
    msg: String,
    type: Number,
    status: Number,
    IP: String
});

module.exports = mongoose.model('clientLog', clientLog);
