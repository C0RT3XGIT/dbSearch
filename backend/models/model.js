const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: String,
    
})

const DBSchema = mongoose.model('importdata', UserSchema);
module.exports = DBSchema;