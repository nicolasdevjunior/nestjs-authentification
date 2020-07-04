import { USER_MODEL_PROVIDER } from '../../constants';
import { Connection } from 'mongoose';
import { DB_PROVIDER} from '../../constants';
import { UserSchema } from '../schema/user.schema';

export const UserProviders = [
    {
        provide: USER_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('user', UserSchema),
        inject: [DB_PROVIDER],
    },
];
