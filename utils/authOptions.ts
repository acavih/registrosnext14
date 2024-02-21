import CredentialsProvider from "next-auth/providers/credentials"
import UserModel from '@/db/models/User'
import bcryptjs from 'bcryptjs'

/**
 * @type {import('next-auth').AuthOptions}
 */
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                if (!credentials) return null
                const user = await UserModel.findOne({user: credentials!.username})
                if (!user) return null
                const matchPassword = await bcryptjs.compare(credentials!.password, user.password!)
                if (!matchPassword) return null

                return {
                    id: user._id.toString(),
                    name: user.user,
                    email: user.user,
                    image: ''
                }
            }
        })
    ],
}