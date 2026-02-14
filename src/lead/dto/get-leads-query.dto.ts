import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsEnum,
  IsIn,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LeadStatus } from '@prisma/client';

const SORTABLE_COLUMNS = [
  'id',
  'name',
  'email',
  'phone',
  'status',
  'value',
  'created_at',
] as const;

export type SortableColumn = (typeof SORTABLE_COLUMNS)[number];

export class LeadsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit must not exceed 100' })
  limit?: number = 10;

  @IsOptional()
  @IsIn(SORTABLE_COLUMNS)
  sortBy?: SortableColumn = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  email?: string;
}
