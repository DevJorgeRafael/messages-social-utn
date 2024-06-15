import { Module } from '@nestjs/common';
import { AcademicoService } from './academico.service';

@Module({
  providers: [AcademicoService]
})
export class AcademicoModule {}
