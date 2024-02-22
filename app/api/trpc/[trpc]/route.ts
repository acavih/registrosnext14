import { appRouter } from "@/server";
import apiEndpoint from "@/utils/apiEndpoint";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = apiEndpoint(req => fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({})
}))

export {handler as GET, handler as POST}