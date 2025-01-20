import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UUID } from 'crypto';

export enum JobType {
  SINGLE = 'single',
}

export class User {
  @ApiProperty({
    description: 'The id of the user sending the request',
    default: '84cb95cd-0de9-48c6-b702-917fba0594fb',
  })
  @IsUUID()
  @IsNotEmpty()
  id: UUID;

  @ApiProperty({
    description: 'The name of the user sending the request',
    default: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class Organization {
  @ApiProperty({
    description: 'The id of the users organization sending the request',
    default: '7c97f753-9280-4fa8-8592-8c55a66dac1f',
  })
  @IsUUID()
  @IsNotEmpty()
  id: UUID;

  @ApiProperty({
    description: 'The name of the users organization sending the request',
    default: 'Acme',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class JobEcho {
  @ApiProperty({
    description: 'The number of jobs being dispatched',
    default: 500,
    minimum: 1,
    maximum: 1000,
  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  total: number;

  @ApiProperty({
    description: 'The context that all dispatched jobs will reference',
    default: '56d74e7e-f0ad-4841-af20-6ce9e5130b99',
  })
  @IsUUID()
  @IsNotEmpty()
  context: UUID;

  @ApiProperty({
    description: 'User details used for emitting messages',
    type: User,
  })
  @ValidateNested()
  @Type(() => User)
  user: User;

  @ApiProperty({
    description: 'Organization details used for emitting messages',
    type: Organization,
  })
  @ValidateNested()
  @Type(() => Organization)
  organization: Organization;
}

export class JobRequest {
  @ApiProperty({
    description: 'The type of the job being simulated',
    enum: JobType,
  })
  @IsEnum(JobType)
  type: JobType;

  @ApiProperty({
    description: 'The queue name where the jobs will be dispatched',
    default: process.env.SRV_FIRST_QUEUE,
    enum: [process.env.SRV_EVENTS_QUEUE, process.env.SRV_FIRST_QUEUE, process.env.SRV_SECOND_QUEUE],
  })
  @IsIn([process.env.SRV_EVENTS_QUEUE, process.env.SRV_FIRST_QUEUE, process.env.SRV_SECOND_QUEUE])
  @IsNotEmpty()
  queue: string;

  @ApiProperty({
    description: 'The maximum delay of jobs being dispatched',
    default: 10,
    minimum: 0,
    maximum: 60,
  })
  @IsNumber()
  @Min(0)
  @Max(60)
  delay: number;

  @ApiProperty({
    description: 'Job echo, used to determine scope of emitted websocket messages',
    type: JobEcho,
  })
  @ValidateNested()
  @Type(() => JobEcho)
  echo: JobEcho;
}
