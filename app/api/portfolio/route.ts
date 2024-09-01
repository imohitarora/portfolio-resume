import { getPortfolio } from '@/actions/neon';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const portfolioData = await getPortfolio();
        return NextResponse.json(portfolioData);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}
