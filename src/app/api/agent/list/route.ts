import { NextRequest } from 'next/server';
import { getAgents } from '@/actions/agents';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const query = searchParams.get('query') || undefined;

    const result = await getAgents(page, pageSize, query);

    if (result.code === 200) {
      return successResponse(result.data, result.message);
    } else {
      return errorResponse(result.message, result.code);
    }
  } catch (error: any) {
    return errorResponse(error.message || 'Internal Server Error', 500);
  }
}