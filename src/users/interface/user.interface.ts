
import { ObjectId } from 'bson';
import { Document } from 'mongoose';

export interface User extends Document {
    readonly _id: string;
    readonly username: string;
    readonly firstname: string;
    readonly number: string;
    readonly nickname: string;
    readonly birth: string;
    readonly password: string;
    readonly adress: string;
    readonly email: string;
    readonly role: string;
    readonly profil: string;
    readonly cover: string;
    readonly piece: string;
}
