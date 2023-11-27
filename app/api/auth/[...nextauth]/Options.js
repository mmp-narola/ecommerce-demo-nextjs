import CredentialsProvider from "next-auth/providers/credentials"

export const options = ({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "test123" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // await dbConnect()
                if (!credentials) {
                    throw new Error('Credentials are missing');
                }

                const { username, password } = credentials;
                if (!username || !password) {
                    throw new Error('Please enter an username and password')
                }

                const user = { id: '1', name: username, email: `${username}@test.email` }

                // const user = await User.findOne({ userName: username })

                // if (!user || !user?.password) {
                //     throw new Error('No user found')
                // }

                // const passwordMatch = await bcrypt.compare(password, user.password)

                // if (!passwordMatch) {
                //     throw new Error('Incorrect password.')
                // }

                return user
            }
        })
    ],
    pages: {
        signIn: '/signIn',
    },
    session: { strategy: 'jwt' },
    secret: "shouldbestoreinENVfile",
    jwt: { secret: "shouldbestoreinENVfile" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, id: user.id, name: user.name };
            }
            return token;
        }, async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    id: token.id
                }
            }
        },
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
    }
})