import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobRequest } from '../dto/job.request.dto';
import { JobResponse } from '../dto/job.response.dto';
import { ValidationResponse } from '../dto/validation.response.dto';

export function SimulateDispatchDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Handles dispatching simulation jobs',
      description: 'Dispatches jobs based on the provided type, delay, and desired number of jobs',
    }),
    ApiBody({
      type: JobRequest,
    }),
    ApiResponse({
      status: 201,
      description: 'Simulated job dispatching response',
      type: JobResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Validation error response',
      type: ValidationResponse,
    })
  );
}
