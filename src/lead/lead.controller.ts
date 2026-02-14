import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsQueryDto } from './dto/get-leads-query.dto';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  findAll(@Query() query: LeadsQueryDto) {
    return this.leadService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
