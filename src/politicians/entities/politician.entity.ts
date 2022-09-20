import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Politician {
  @ApiProperty({
    description: 'id',
    required: false,
    example: '9Hg8VoMBFiw-GRyBQVK7',
  })
  id?: string;

  @ApiProperty({
    description: 'Nombre',
    required: true,
    example: 'Juan García',
  })
  fullName: string;

  @ApiProperty({
    description: 'Partido',
    required: true,
    example: 'Partido Azul',
  })
  party: string;

  @ApiProperty({
    description: 'Partido Para Filtro',
    required: true,
    example: 'Partido Azul',
  })
  partyFilter: string;

  @ApiProperty({ description: 'Género', required: true, example: 'Hombre' })
  gender: string;

  @ApiProperty({ description: 'Ocupación', required: true, example: 'Alcalde' })
  occupation: string;

  @ApiProperty({
    description: 'Ocupación Para Filtro',
    required: true,
    example: 'Alcalde',
  })
  occupationFilter: string;

  @ApiProperty({
    description: 'Comunidad Autónoma',
    required: true,
    example: 'Comunidad Valenciana',
  })
  community: string;

  @ApiProperty({
    description: 'Institución',
    required: true,
    example: 'Ayuntamiento de Alcocer de Planes',
  })
  institution: string;

  @ApiProperty({
    description: 'Salario Base',
    required: true,
    example: 10000.0,
  })
  baseSalary: number;

  @ApiProperty({
    description: 'Retribución mensual',
    required: true,
    example: 0.0,
  })
  monthlyPayment: number;

  @ApiProperty({
    description: 'Retribución anual',
    required: true,
    example: 0.0,
  })
  yearlyPayment: number;

  @ApiPropertyOptional({
    description: 'Salario Complementario',
    example: 5000.0,
  })
  complementSalary: number;

  @ApiPropertyOptional({
    description: 'Pagas Extra Sueldo',
    example: 14300.0,
  })
  extraPay: number;

  @ApiPropertyOptional({
    description: 'Otras dietas e indemnizaciones',
    example: 0.0,
  })
  otherAllowancesAndIndemnities: number;

  @ApiPropertyOptional({
    description: 'Trienios sueldo',
    example: 0.0,
  })
  threeYearsSalary: number;

  @ApiPropertyOptional({
    description: 'observaciones',
    example: 'Dedicación Exclusiva',
  })
  observations: string;
}
