import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

/**
 * success
 * @param data return data
 * @param message Prompt message (default: 'Success')
 * @param code Business status codes (default: 200)
 */
export function successResponse<T>(data: T, message: string = 'Success', code: number = 200) {
  const body: ApiResponse<T> = {
    success: true,
    code,
    message,
    data,
    timestamp: Date.now(),
  };

  return NextResponse.json(body, { status: 200 });
}

/**
 * Error Response
 * @param message error message
 * @param code HTTP status codes or business error codes (default: 500)
 * @param data Optional error details data
 */
export function errorResponse(message: string = 'Internal Server Error', code: number = 500, data: any = null) {
  console.log(data);
  
  const body: ApiResponse<null> = {
    success: false,
    code,
    message,
    data, // This could be a specific error stack or validation failure field.
    timestamp: Date.now(),
  };
  return NextResponse.json(body, { status: code });
}