import * as mongoose from 'mongoose';
import { DB_PROVIDER } from '../constants';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;

            try{
                const db = await mongoose.connect(
                'mongodb://localhost:27017/diariko',{ useNewUrlParser: true,useFindAndModify:false });
                console.log("Database connected"); 
                return db;
            }catch(e){    
                console.log("error : ", e);
                return null; 
            } 
        },
    },
];
