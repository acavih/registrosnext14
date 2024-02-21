import dbQuery from "@/db/dbQuery";
import ResourceModel from "@/db/models/Resources";
import apiEndpoint from "@/utils/apiEndpoint";
import { NextResponse } from "next/server";

export const POST = apiEndpoint(async (req, res) => {
    const data = await req.json()

    await dbQuery(async () => {
        await ResourceModel.create(data)
    })

    return NextResponse.json({})
})

export const PUT = apiEndpoint(async (req, res) => {
    const data = await req.json()
    const id = await req.nextUrl.searchParams.get('id')

    await dbQuery(async () => {
        await ResourceModel.findByIdAndUpdate(id, data)
    })

    return NextResponse.json({})
})