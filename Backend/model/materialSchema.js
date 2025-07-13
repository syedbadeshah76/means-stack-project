// const materialSchema = require("../model/materialSchema");
var mongoose = require('mongoose');

var materialSchema = mongoose.Schema({
    code: String,
    name: String,
    price: Number,
    quantity: Number,
    tax: Number,
    
});

const Material = mongoose.model("Material",  materialSchema);

module.exports = Material;