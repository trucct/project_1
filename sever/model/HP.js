const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HP= new Schema({
    mahp:   String,
    tenhp:   String,
    sotinchi:  String,
    lop:  String,

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model('HP', HP);