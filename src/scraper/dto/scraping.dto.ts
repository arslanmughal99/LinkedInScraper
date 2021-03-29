import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ScrapingDto {
  @IsNotEmpty({ message: 'Task id is required.' })
  @IsUUID('4', { message: 'Task Id must b valid UUID4.' })
  id: string;

  @IsNotEmpty({ message: 'Job title is required.' })
  @IsString({ message: 'Invalid Job title.', each: true })
  jobTitle: string[];

  // @IsNotEmpty({ message: 'Country is required.' })
  // @IsString({ message: 'Invalid country provided.' })
  // country: string;

  // @IsOptional()
  // @IsNotEmpty({ message: 'Country is required.' })
  // @IsString({ message: 'Invalid country provided.' })
  // location?: string;

  // @IsOptional()
  // @IsArray({ message: 'Include keywords need to be an array.' })
  // @IsString({ message: 'Invalid include keywords', each: true })
  // include?: string[];

  // @IsOptional()
  // @IsArray({ message: 'Exclude keywords need to be an array.' })
  // @IsString({ message: 'Invalid exclude keywords', each: true })
  // exclude?: string[];

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
