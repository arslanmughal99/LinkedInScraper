import {
  IsUUID,
  IsArray,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class ScrapingDto {
  @IsNotEmpty({ message: 'Task id is required.' })
  @IsUUID('4', { message: 'Task Id must b valid UUID4.' })
  id: string;

  @IsNotEmpty({ message: 'Job title is required.' })
  @IsString({ message: 'Invalid Job title.', each: true })
  jobTitles: string[];

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false },
    { message: 'Invalid limit provided.' },
  )
  limit?: number;

  @IsOptional()
  @IsArray({ message: 'Email domains need to be an array.' })
  @IsString({ message: 'Email domain(s) not valid.', each: true })
  domains?: string[];
}
