import { FORMATION_CATEGORY_MODEL_PROVIDER, FORMATION_MODEL_PROVIDER, FORMATION_SECTION_MODEL_PROVIDER, FORMATION_CONTENT_MODEL_PROVIDER, FORMATION_COURS_MODEL_PROVIDER } from '../../constants';
import { Connection } from 'mongoose';
import { DB_PROVIDER} from '../../constants';
import { FormationCategorySchema, FormationsSchema, FormationSectionsSchema, FormationContentsSchema, FormationCoursSchema } from '../schema/formation.schema';

export const FormationCategoryProviders = [
    {
        provide: FORMATION_CATEGORY_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('formationCategory', FormationCategorySchema),
        inject: [DB_PROVIDER],
    },
];

export const FormationsProviders = [
    {
        provide: FORMATION_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('formations', FormationsSchema),
        inject: [DB_PROVIDER],
    },
];

export const FormationCoursProviders = [
    {
        provide: FORMATION_COURS_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('formationsCours', FormationCoursSchema),
        inject: [DB_PROVIDER],
    },
];

export const FormationSectionsProviders = [
    {
        provide: FORMATION_SECTION_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('formationSections', FormationSectionsSchema),
        inject: [DB_PROVIDER],
    },
];

export const FormationContentsProviders = [
    {
        provide: FORMATION_CONTENT_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('formationContents', FormationContentsSchema),
        inject: [DB_PROVIDER],
    },
];