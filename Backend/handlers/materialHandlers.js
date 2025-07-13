const materialSchema = require("../model/materialSchema");
exports.CreateMaterial = CreateMaterial;
exports.getMaterial = getMaterial;
exports.editMaterial= editMaterial;


async function CreateMaterial(data){
    try {
        let material = await materialSchema.create(data);
        return {message: "Material Created Successfully", success: true, data: material};
    } catch(err) {
        return {message: err, success: false};
    }
}
async function editMaterial(code) {
    try {
        let material = await materialSchema.updateOne( { code: code.code },  { $set: code }       
        );

        return { message: "Material Updated Successfully", success: true, data: material };
    } catch (err) {
        return { message: err.message, success: false };
    }
}


async function getMaterial(){
    try{
        let materials = await materialSchema.find();
        return {message: "material fetched Succcessfully", success: true, data: materials}
    }catch(err){
        return {message: err, success: false};
    }
}
