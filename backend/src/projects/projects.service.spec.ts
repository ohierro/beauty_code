import { Page } from '@core/page'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectEntity } from './entity/project-entity'
import { ProjectsService } from './projects.service'

describe('ProjectsService', () => {
  let service: ProjectsService
  let repo: Repository<ProjectEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(ProjectEntity),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<ProjectsService>(ProjectsService)
    repo = module.get<Repository<ProjectEntity>>(
      getRepositoryToken(ProjectEntity),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all projects', async () => {
    const entities = [
      { id: 0, name: 'test', description: '' },
      { id: 1, name: 'test1', description: '' },
    ]

    const dtos = entities.map((entity) => {
      return { id: entity.id, name: entity.name }
    })

    jest.spyOn(repo, 'find').mockReturnValue(Promise.resolve(entities))
    expect(await service.findAll(null)).toEqual(dtos)
  })

  it('should call with pagination', async () => {
    const entities = [
      { id: 0, name: 'test', description: '' },
      { id: 1, name: 'test1', description: '' },
    ]

    const dtos = entities.map((entity) => {
      return { id: entity.id, name: entity.name }
    })

    // let findMock = jest.fn().mockReturnValue(Promise.resolve(entities))
    const findMock = jest.spyOn(repo, 'find')
    findMock.mockReturnValue(Promise.resolve(entities))

    // jest.spyOn(repo, 'find').mockReturnValue(Promise.resolve(entities))
    expect(await service.findAll(Page.with(0, 5))).toEqual(dtos)
    expect(findMock).toHaveBeenCalled()
  })
})
