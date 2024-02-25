import dbQuery from "@/db/dbQuery";
import { privateProcedure, publicProcedure, router } from "./trpc";
import Attention from "@/db/models/Attention";
import { z } from "zod";

export const appRouter = router({
    getTodos: publicProcedure.query(() => {
        return ['10', '20', '30', '40']
    }),
    getAttentionsData: privateProcedure.input(z.object({
        df: z.string().default('2023-01-01'),
        dt: z.string().default('2023-12-31'),
    })).query(async ({input}) => {
        const attentions = await dbQuery(async () => {
            const items = Attention.find({
                fechaatencion: {
                    $gt: new Date(input.df),
                    $lt: new Date(input.dt),
                }
            }).populate({
                path: 'user',
                populate: ['sexo', 'socioono', 'nacionalidad', 'ciudadresidencia', 'howDidKnowUs', 'yearDidKnowus']
            }).populate([
                'Proyectos', 'tipoaenciones', 'motivosatencion', 'derivadoa',
                'derivadode', 'formacion', 'voluntariado', 'lugaratencion'
            ])

            return items
        })
        return { attentions }
    })
})

export type AppRouter = typeof appRouter