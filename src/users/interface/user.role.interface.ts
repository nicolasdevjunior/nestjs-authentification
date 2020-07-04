
import { ObjectId } from 'bson';
import { Document } from 'mongoose';

export interface UserRole extends Document{
    _id : ObjectId;  
    userRole : string; 
}
