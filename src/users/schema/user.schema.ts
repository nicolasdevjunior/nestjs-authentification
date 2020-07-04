import * as mongoose from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;


var enumValues = {
    values: ['Superadmin' ,'Admin','User','Client'],
    message: 'Role is required.'
}

export const UserSchema = new mongoose.Schema({
    username: { type : String, required: true },
    firstname: { type : String, required: true },
    nickname: { type : String, required: true },
    birth: { type : Date, required: true },
    number: { type : String, required: true },
    password: { type : String, required: true },
    email: { type : String, required: true },
    profil : { type : String, required: true },
    cover : { type : String, required: true },
    piece : { type : String, required: false,default : null },
    adress : { type : String, required: true },
    role: { type:String, enum:enumValues,trim : true,default: 'Client', required: false },
}, { collection: 'users' });