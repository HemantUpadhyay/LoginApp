const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: string,unique:true,required:true},
    hash: {type:string, required:true},
    firstName: {type:string, },
    lastName: {type:string,  required:true},
    email_Id: {type:string,  required:true},
    created:{type:string, default:Date.now},    
});
//schema.set('toJSON',{virtuals:true});
let users = mongoose.model('Users',userSchema)
module.exports =  users;