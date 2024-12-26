import { Module } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recruitment, RecruitmentSchema } from './recruitment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Recruitment.name, schema: RecruitmentSchema }])],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
  exports:[RecruitmentService],
})
export class RecruitmentModule {}
