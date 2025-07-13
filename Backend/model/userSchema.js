var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    customerCode:{
                    type: 'string',
                    require: [true, "number Required"]

    } ,
    customerName: String,
});
const User = mongoose.model("user",  userSchema);
module.exports = User;  