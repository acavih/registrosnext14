import dbQuery from "@/db/dbQuery"
import Partner from "@/db/models/Partner"
import PartnerPage from './PartnerPage'

export default async function Page ({params}) {
    const partner = await dbQuery(async () => {
        return Partner.findById(params.partnerId)
            .populate('socioono')
            .populate('nacionalidad')
            .populate('ciudadresidencia')
            .populate('howDidKnowUs')
            .populate('yearDidKnowus')
    })
    return (
        <PartnerPage partner={partner} />
    )
}