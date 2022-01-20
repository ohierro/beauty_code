import { Body, Controller, Get, Post } from '@nestjs/common'
import AddProjectDto from './dtos/AddProjectDto'

@Controller('projects')
export class ProjectsController {
  @Get()
  listProjects(): string {
    return `projects`
  }

  @Post()
  addProject(@Body() addProjectDto:AddProjectDto): Partial<AddProjectDto> {
    return new AddProjectDto()
  }
}
