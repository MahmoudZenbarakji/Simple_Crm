import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsQueryDto } from './dto/get-leads-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: LeadsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = this.buildWhere(query);
    const orderBy = this.buildOrderBy(query);

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          value: true,
          created_at: true,
        },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private buildWhere(query: LeadsQueryDto): Prisma.LeadWhereInput {
    const where: Prisma.LeadWhereInput = {};

    if (query.name?.trim()) {
      where.name = { contains: query.name.trim(), mode: 'insensitive' };
    }
    if (query.email?.trim()) {
      where.email = { contains: query.email.trim(), mode: 'insensitive' };
    }
    if (query.status != null) {
      where.status = query.status;
    }

    return where;
  }

  private buildOrderBy(
    query: LeadsQueryDto,
  ): Prisma.LeadOrderByWithRelationInput {
    const column = query.sortBy ?? 'created_at';
    const order = query.order ?? 'desc';
    return { [column]: order };
  }

  create(createLeadDto: CreateLeadDto) {
    return 'This action adds a new lead';
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
