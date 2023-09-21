const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    org: String,
    email: String,
    phone: String,
    addy: String,
});

module.exports = mongoose.model('User', userSchema);