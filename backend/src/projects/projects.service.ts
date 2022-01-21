import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Page } from 'src/core/page'
import { FindManyOptions, Repository } from 'typeorm'
import AddProjectDto from './dtos/add-project-dto'
import { ProjectDto } from './dtos/project-dto'
import { ProjectEntity } from './entity/project-entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  public async findAll(page: Page | null): Promise<ProjectDto[]> {
    // return [
    //   { id: 0, name: 'sample project' },
    //   { id: 1, name: 'another project' },
    // ]
    // return (await this.projectRepository.find()).map((entity) => {
    //   return { id: entity.id, name: entity.name }
    // })
    const options: FindManyOptions<ProjectDto> = {}
    if (page) {
      options.take = page.size
      options.skip = page.page * page.size
    }
    const result = await this.projectRepository.find(options)
    return result.map((entity) => {
      return { id: entity.id, name: entity.name }
    })
  }

  public async create(projectDto: AddProjectDto): Promise<ProjectDto> {
    let entity = new ProjectEntity()
    entity.name = projectDto.name
    entity.description = ''

    entity = await this.projectRepository.save(entity)
    return { id: entity.id, name: entity.name }
  }
}
