import { neon } from '@neondatabase/serverless';
import { CVData } from '@/lib/types';


export async function getAllowedUsers() {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const appId = process.env.APP_ID;
        const response = await sql`SELECT allowed_users FROM mht_applications WHERE app_id = ${appId}`;
        return response[0].allowed_users;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPortfolio() {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT data FROM amdc_profile_data`;
    return response[0].data;
}

export async function updatePortfolio(data: CVData) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set in the environment variables");
    }
    const sql = neon(databaseUrl);
    const response = await sql`UPDATE amdc_profile_data SET data = ${JSON.stringify(data)} WHERE id = 1`;
    return response;
}