import { updatePortfolio } from '@/actions/neon';
import { CVData } from '@/lib/types';
import { NextResponse } from 'next/server';


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
