const mongoose = require("mongoose");

const details = new mongoose.Schema({
  billnumber: String,
  date: Date,
  customerName: String,


  invoiceItems: [{
    customerName: String,
    materialName: String,
    quantity: Number,
    price: Number,
    grossAmount: Number,
    tax: Number,
    netAmount: Number,
  }],
});

// Create model
const invoice = mongoose.model("Invoice", details);

module.exports = invoice;
