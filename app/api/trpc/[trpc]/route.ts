import dbQuery from "@/db/dbQuery";
import UserModel from "@/db/models/User";
import { appRouter } from "@/server";
import apiEndpoint from "@/utils/apiEndpoint";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";

const handler = apiEndpoint(req => fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => {
        const user = await getServerSession()
        const {password, ...userDB} = await dbQuery(async () => {
            return UserModel.findOne({user: user?.user?.name})
        })
        return {
            user: {
                user: userDB.user,
                _id: userDB._id
            }
        }
    }
}))

export {handler as GET, handler as POST}