import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/hostings/all', request.url));
}

export const config = {
    matcher: ['/hostings'],
};