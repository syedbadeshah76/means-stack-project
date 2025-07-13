const invoiceSchema = require("../model/invoiceSchema");

exports.createinvoice = async function (data) {
    try {
        // Save the invoice with all the items
        let invoice = await invoiceSchema.create({
            billnumber: data.billnumber,
            date: data.date,
            invoiceItems: data.invoiceItems,  // Array of invoice items
        });
        
        return { message: "Invoice Created Successfully", success: true, data: invoice };
    } catch (err) {
        return { message: err.message, success: false };
    }
};

exports.displayInvoices = async function () {
    try {
        let invoices = await invoiceSchema.find();
        return { message: "Invoices fetched successfully", success: true, data: invoices };
    } catch (err) {
        return { message: err.message, success: false };
    }
};
