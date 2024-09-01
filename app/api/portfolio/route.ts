import { NextResponse } from 'next/server';
import { updatePortfolio } from '@/actions/neon';
import { CVData } from '@/lib/types';
import { getPortfolio } from '@/actions/neon';

export async function GET() {
    try {
        const portfolioData = await getPortfolio();
        return NextResponse.json(portfolioData);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data: CVData = await request.json();
        const result = await updatePortfolio(data);
        return NextResponse.json({ message: 'Portfolio updated successfully', result });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
    }
}
