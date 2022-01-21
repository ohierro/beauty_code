import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { databaseProviders } from './database'
import { ProjectEntity } from './projects/entity/project-entity'
import { ProjectsModule } from './projects/projects.module'

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'beautycode',
    //   password: 'beautycode',
    //   database: 'beautycode',
    //   entities: [ProjectEntity],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: [ProjectEntity],
      synchronize: true,
    }),
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
