import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const privateProcedure = t.procedure.use(async ({ctx, next}) => {
    if (!(ctx as any).user._id) {
        throw new TRPCError({code: 'UNAUTHORIZED'})
    }
    return next()
})