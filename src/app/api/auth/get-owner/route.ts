import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { email } = await req.json();
	const user = await prisma.owner.findUnique({ where: { email } });

	if (!user) {
		return new NextResponse(null, { status: 404 });
	}

	return NextResponse.json(user);
}