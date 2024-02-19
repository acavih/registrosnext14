import dbQuery from "@/db/dbQuery"
import Partner from "@/db/models/Partner"
import Attention from "@/db/models/Attention"
import PartnerPage from './PartnerPage'

export default async function Page ({params}) {
    const {partner, attentions} = await dbQuery(async () => {
        const partner = await Partner.findById(params.partnerId)
            .populate('socioono')
            .populate('nacionalidad')
            .populate('ciudadresidencia')
            .populate('howDidKnowUs')
            .populate('yearDidKnowus')
            .populate('sexo')
        
        const attentions = await Attention.find({user: partner._id})
            .populate('lugaratencion')
            .populate('tipoaenciones')
            .populate('Proyectos')
            .populate('motivosatencion')
            .populate('derivadoa')
            .populate('derivadode')
            .populate('formacion')
            .populate('voluntariado')
            .sort('-fechaatencion')

        return {partner, attentions}
    })
    return (
        <PartnerPage partner={partner} attentions={attentions} />
    )
}