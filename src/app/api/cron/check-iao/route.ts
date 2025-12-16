import { NextResponse } from 'next/server';
import { processPendingIaoChecks } from '@/services/iao.service';

export const dynamic = 'force-dynamic';

export const maxDuration = 60; 

export async function GET(request: Request) {
  try {
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
    const result = await processPendingIaoChecks();
    return NextResponse.json({ success: true, ...result });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}