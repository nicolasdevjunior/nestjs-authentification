import { USER_ROLE_MODEL_PROVIDER } from '../../constants';
import { Connection } from 'mongoose';
import { DB_PROVIDER} from '../../constants';
import { UserRoleSchema } from '../schema/user.role.schema';

export const UserRoleProviders = [
    {
        provide: USER_ROLE_MODEL_PROVIDER, 
        useFactory: (connection: Connection) => connection.model('userRole', UserRoleSchema),
        inject: [DB_PROVIDER],
    },
];
