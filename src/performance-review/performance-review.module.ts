import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceReview, PerformanceReviewSchema } from './performance-review.schema';
import { PerformanceReviewService } from './performance-review.service';
import { PerformanceReviewController } from './performance-review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PerformanceReview.name, schema: PerformanceReviewSchema },
    ]),
  ],
  controllers: [PerformanceReviewController],
  providers: [PerformanceReviewService],
  exports: [PerformanceReviewService],
  
})
export class PerformanceReviewModule {}
