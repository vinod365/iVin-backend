import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ListReportsDto } from './dto/list-reports.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ) { }


    async createPost(createReportDto: CreateReportDto) {
        const post = this.reportRepository.create(createReportDto)
        return await this.reportRepository.save(post);
    }

    async listPosts(listReportDto: ListReportsDto) {
        const { search, sortBy, page = 1, limit = 10 } = listReportDto;
        const skip = (page - 1) * limit;

        const queryBuilder = this.reportRepository.createQueryBuilder('report')
            .select([
                'report.id',
                'report.note',
                'report.userId',
                'report.createdAt',
                'report.updatedAt',
            ])
            .skip(skip)
            .take(limit);

        if (search) {
            queryBuilder.andWhere('user.note ILIKE :search', { search: `%${search}%` });
        }

        // Handle sorting
        if (sortBy === 'newest') {
            queryBuilder.orderBy('report.createdAt', 'DESC');
        } else if (sortBy === 'oldest') {
            queryBuilder.orderBy('report.createdAt', 'ASC');
        }

        const [reports, total] = await queryBuilder.getManyAndCount();

        return {
            data: reports,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

}
