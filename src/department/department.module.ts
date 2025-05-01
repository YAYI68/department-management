import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { DataSource } from 'typeorm';
import { Department } from './entities/department.entity';
import { DEPARTMENT_REPOSITORY } from './contants/department.constant';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: DEPARTMENT_REPOSITORY,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Department),
      inject: ['DATA_SOURCE'],
    },
    DepartmentResolver,
    DepartmentService,
  ],
})
export class DepartmentModule {}
