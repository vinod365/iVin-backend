import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ListReportsDto } from './dto/list-reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Post('')
  async createReport(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.createPost(createReportDto);
  }

  @Get('')
  async listReports(@Query() listReportsDto: ListReportsDto) {
    return this.reportsService.listPosts(listReportsDto);
  }

}
