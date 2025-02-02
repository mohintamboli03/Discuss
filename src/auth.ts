export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: "/auth/signin",  // 👈 This ensures NextAuth recognizes the sign-in page
    },
    callbacks: {
        async session({ user, session }) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV === "development",  // 👈 Enables debug logs in dev
});
