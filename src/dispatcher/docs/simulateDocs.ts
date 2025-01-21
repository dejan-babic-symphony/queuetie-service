import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SimulateRequest } from '../dto/simulate.request.dto';
import { SimulateResponse } from '../dto/simulate.response.dto';
import { ValidationResponse } from '../dto/validation.response.dto';

export function SimulateDispatchDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Handles dispatching simulation jobs',
      description: 'Dispatches jobs based on the provided type, delay, and desired number of jobs',
    }),
    ApiBody({
      type: SimulateRequest,
    }),
    ApiResponse({
      status: 201,
      description: 'Simulated job dispatching response',
      type: SimulateResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Validation error response',
      type: ValidationResponse,
    })
  );
}
