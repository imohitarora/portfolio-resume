import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { getAllowedUsers } from "@/actions/neon";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!profile?.email) {
                return false
            }
            const allowedUsers = await getAllowedUsers();
            return allowedUsers.includes(profile.email);
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }