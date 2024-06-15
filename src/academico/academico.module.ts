import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AcademicoService } from './academico.service';

@Module({
  imports: [HttpModule],
  providers: [AcademicoService],
  exports: [AcademicoService],
})
export class AcademicoModule { }
