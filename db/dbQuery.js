import mongoose from 'mongoose'

export default async function dbQuery(fn, debug) {
    await mongoose.connect(process.env.MONGODB_URI)
    const result = await fn()
    if (debug) {
        console.log(debug, result)
    }
    return JSON.parse(JSON.stringify(result))
}