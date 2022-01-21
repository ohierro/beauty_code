import { Body, Controller, Get, Post } from '@nestjs/common'
import AddProjectDto from './dtos/add-project-dto'
import { ProjectDto } from './dtos/project-dto'
import { ProjectsService } from './projects.service'

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async listProjects(): Promise<ProjectDto[]> {
    return await this.projectsService.findAll(null)
  }

  @Post()
  async addProject(@Body() addProjectDto: AddProjectDto): Promise<ProjectDto> {
    console.log(`project ${addProjectDto}`)
    return await this.projectsService.create(addProjectDto)
  }
}
