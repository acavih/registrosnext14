import dbQuery from '@/db/dbQuery';
import Partner, { searchPartner } from '@/db/models/Partner';
import PartnersPage from './PartnersPage';

export default async function Page({searchParams: {s}}) {
    const partners = await dbQuery(async () => {
        if (s) {
            return await searchPartner(s)
        } else {
            return await Partner.find({}).limit(20)
        }
    })
    return (
        <PartnersPage partners={partners} s={s} />
    )
}
