const userSchema = require("../model/userSchema");
exports.CreateUser = CreateUser;
exports.getUser = getUser;
exports.editCustomer = editCustomer;
async function CreateUser(data){
   try {
    let User = await userSchema.create(data);
    return {message: "user Cretaed Succcessfully",  success: true,  data: User }
     } catch(err) {
            return {message: err, success: false};
        }
}

async function editCustomer(data) {
    try {
        let user = await userSchema.updateOne(
            { customerCode: data.customerCode }, { $set: { customerName: data.customerName } } // Update the relevant fields
        );
        return { message: "Customer updated successfully", success: true, data: user };
    } catch (err) {
        return { message: err.message, success: false };
    }
}

async function getUser(data){
    try {
        let users = await userSchema.find();
        // if(!User) return {message: "User not found", success: false};
        return {message: "User fetched successfully", success: true, data: users};
    } catch(err) {
        return {message: err, success: false};
    }
}