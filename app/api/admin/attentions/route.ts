import dbQuery from "@/db/dbQuery";
import Attention from "@/db/models/Attention";
import apiEndpoint from "@/utils/apiEndpoint";
import { NextResponse } from "next/server";

export const POST = apiEndpoint(async (req, res) => {
    const data = await req.json()
    const userId = req.nextUrl.searchParams.get('partnerId')
    const attention = await dbQuery(async () => {
        const attention = await Attention.create({
            ...data,
            user: userId
        })
        console.log(attention)
        return attention
    })
    return NextResponse.json(attention)
})

export const PUT = apiEndpoint(async (req, res) => {
    const data = await req.json()
    const att = req.nextUrl.searchParams.get('attention')
    await dbQuery(async () => {
        await Attention.findByIdAndUpdate(att, data)
    })
    return NextResponse.json({})
})

export const DELETE = apiEndpoint(async (req, res) => {
    const att = req.nextUrl.searchParams.get('attention')
    console.log('Eliminando atencion', att)
    await dbQuery(async () => {
        await Attention.findByIdAndDelete(att)
    })
    return NextResponse.json({})
})