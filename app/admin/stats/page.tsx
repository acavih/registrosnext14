import '@/db/models/Resources'
import dbQuery from "@/db/dbQuery";
import StatsPage from "./StatsPage";
import Attention from "@/db/models/Attention";

export default async function Page () {
    return (
        <StatsPage />
    )
}