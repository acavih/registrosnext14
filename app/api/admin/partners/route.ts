import dbQuery from "@/db/dbQuery"
import Partner from "@/db/models/Partner"
import apiEndpoint from "@/utils/apiEndpoint"
import { NextResponse } from "next/server"

export const POST = apiEndpoint(async (req, res) => {
    const data = await req.json()
    const partner = await dbQuery(async () => {
        const p = await Partner.create(data)
        return p
    })
    return NextResponse.json(partner)
})

export const PUT = apiEndpoint(async (req, res) => {
    const partnerId = req.nextUrl.searchParams.get('partnerId')
    const data = await req.json()
    await dbQuery(async () => {
        await Partner.findByIdAndUpdate(partnerId, data)
    })
    return NextResponse.json({})
})

export const DELETE = apiEndpoint(async (req, res) => {
    const partnerId = req.nextUrl.searchParams.get('partnerId')
    await dbQuery(async () => {
        await Partner.findByIdAndDelete(partnerId)
    })
    return NextResponse.json({})
})
