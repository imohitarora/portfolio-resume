import { neon } from '@neondatabase/serverless';


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