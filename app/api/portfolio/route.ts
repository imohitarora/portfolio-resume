import { getPortfolio } from '@/actions/neon';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Check for custom header
    const customHeader = request.headers.get('X-Custom-Auth');
    const expectedHeader = process.env.NEXTAUTH_SECRET;

    // If the custom header doesn't match the NEXTAUTH_SECRET, deny the request
    if (customHeader !== expectedHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const portfolioData = await getPortfolio();
        return NextResponse.json(portfolioData);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}
