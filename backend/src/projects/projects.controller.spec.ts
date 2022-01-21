import { Test, TestingModule } from '@nestjs/testing'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { createMock } from '@golevelup/ts-jest'
// const moduleMocker = new ModuleMocker(global);

describe('ProjectsController', () => {
  let controller: ProjectsController
  let service: ProjectsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: 'ProjectsService',
          useFactory: () => createMock<ProjectsService>(),
        },
      ],
    })
      .useMocker((token) => {
        if (token === ProjectsService) {
          return { find: jest.fn().mockReturnValue([]) }
        }
        if (typeof token === 'function') {
          console.log(`what`)
          // const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          // const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          // return new Mock()
        }
      })
      .compile()

    controller = module.get<ProjectsController>(ProjectsController)
    service = module.get<ProjectsService>(ProjectsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
