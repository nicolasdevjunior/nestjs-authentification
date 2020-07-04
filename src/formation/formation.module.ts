import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';
import { FormationCategoryProviders, FormationsProviders, FormationSectionsProviders, FormationContentsProviders, FormationCoursProviders } from './providers/formations.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports:[ DatabaseModule ],
  controllers: [FormationController],
  providers: [FormationService, 
    ...FormationCategoryProviders,
    ...FormationsProviders,
    ...FormationSectionsProviders,
    ...FormationContentsProviders, 
    ...FormationCoursProviders
  ]
})
export class FormationModule {}
