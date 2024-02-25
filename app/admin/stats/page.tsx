import '@/db/models/Resources'
import dbQuery from "@/db/dbQuery";
import StatsPage from "./StatsPage";
import Attention from "@/db/models/Attention";

export default async function Page () {
    const attentions = await dbQuery(async () => {
        const items = Attention.find({
            fechaatencion: {
                $gt: new Date('2023-01-01'),
                $lt: new Date('2023-12-31'),
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
    return (
        <StatsPage attentions={attentions} />
    )
}