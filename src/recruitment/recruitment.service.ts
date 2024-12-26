import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recruitment } from './recruitment.schema';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Recruitment.name) private readonly recruitmentModel: Model<Recruitment>,
  ) {}

  async create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment> {
    return this.recruitmentModel.create(createRecruitmentDto);
  }

  async findAll(): Promise<Recruitment[]> {
    return this.recruitmentModel.find().populate('departmentID').exec();
  }

  async findOne(id: string): Promise<Recruitment> {
    const recruitment = await this.recruitmentModel.findById(id).populate('departmentID').exec();
    if (!recruitment) {
      throw new NotFoundException(`Recruitment with ID ${id} not found`);
    }
    return recruitment;
  }

  async update(id: string, updateRecruitmentDto: UpdateRecruitmentDto): Promise<Recruitment> {
    const updatedRecruitment = await this.recruitmentModel.findByIdAndUpdate(id, updateRecruitmentDto, {
      new: true,
    });
    if (!updatedRecruitment) {
      throw new NotFoundException(`Recruitment with ID ${id} not found`);
    }
    return updatedRecruitment;
  }

  async remove(id: string): Promise<void> {
    const result = await this.recruitmentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Recruitment with ID ${id} not found`);
    }
  }
}
