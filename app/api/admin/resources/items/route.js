import dbQuery from "@/db/dbQuery";
import apiEndpoint from "@/utils/apiEndpoint";
import { NextResponse } from "next/server";
import ResourceModel from '@/db/models/Resources'

export const GET = apiEndpoint(async (req, res) => {
    const type = req.nextUrl.searchParams.get('type')
    const resources = await dbQuery(async () => {
        return await ResourceModel.find({type}).sort('name')
    })
    return NextResponse.json(resources)
})