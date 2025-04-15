import { NextResponse } from 'next/server';
import { getHostingsByIds } from '@/lib/server-utils';

export async function POST(req: Request) {
    const body = await req.json();
    const ids = body.ids;

    if (!Array.isArray(ids)) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const hostings = await getHostingsByIds(ids);
    return NextResponse.json(hostings);
}