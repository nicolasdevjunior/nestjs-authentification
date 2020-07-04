import { Test, TestingModule } from '@nestjs/testing';
import { FormationController } from './formation.controller';

describe('Formation Controller', () => {
  let controller: FormationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationController],
    }).compile();

    controller = module.get<FormationController>(FormationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
