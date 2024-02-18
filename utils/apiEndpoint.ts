import { NextRequest, NextResponse } from "next/server";

type cb = (req: NextRequest, res: NextResponse) => void

export default function apiEndpoint(fn: cb) {
    return fn
}