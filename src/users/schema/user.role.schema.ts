import * as mongoose from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;


export const UserRoleSchema = new mongoose.Schema({
    userRole: { type : String, required: true }, 
}, { collection: 'usersRole' });