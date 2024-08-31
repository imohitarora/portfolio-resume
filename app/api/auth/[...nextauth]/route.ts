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
            console.log(allowedUsers)
            return allowedUsers.includes(profile.email);
        },
    },
})

export { handler as GET, handler as POST }