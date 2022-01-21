import { createConnection } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return await createConnection({
        // type: 'postgres',
        // host: 'localhost',
        // port: 5432,
        // username: 'beautycode',
        // password: 'beautycode',
        // database: 'beautycode',
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // synchronize: true,
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      })
    },
  },
]
