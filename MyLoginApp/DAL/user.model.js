const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String,unique:true,required:true},
    hash: {type:String, required:true},
    firstName: {type:String, },
    lastName: {type:String,  required:true},
    email_Id: {type:String,  required:true},
    created:{type:String, default:Date.now},    
});
//schema.set('toJSON',{virtuals:true});
let users = mongoose.model('Users',userSchema)
module.exports =  users;