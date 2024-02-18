import dbQuery from '@/db/dbQuery';
import Partner from '@/db/models/Partner';

export default async function PartnersPage() {
    const partners = await dbQuery(async () => {
        return await Partner.find({}).limit(20)
    })
    return (
        <PartnersPage partners={partners} />
    )
}
