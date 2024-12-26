import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePerformanceReviewDto } from './dto/create-performance-review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance-review.dto';
import { PerformanceReview } from './performance-review.schema';

@Injectable()
export class PerformanceReviewService {
  constructor(
    @InjectModel(PerformanceReview.name)
    private readonly performanceReviewModel: Model<PerformanceReview>,
  ) {}

  async create(createDto: CreatePerformanceReviewDto): Promise<PerformanceReview> {
    const review = new this.performanceReviewModel(createDto);
    return review.save();
  }

  async findAll(): Promise<PerformanceReview[]> {
    return this.performanceReviewModel.find().populate('employeeID reviewerID').exec();
  }

  async findOne(id: string): Promise<PerformanceReview> {
    const review = await this.performanceReviewModel.findById(id).exec();
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, updateDto: UpdatePerformanceReviewDto): Promise<PerformanceReview> {
    const updatedReview = await this.performanceReviewModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updatedReview) throw new NotFoundException('Review not found');
    return updatedReview;
  }

  async remove(id: string): Promise<void> {
    const result = await this.performanceReviewModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Review not found');
  }
}
