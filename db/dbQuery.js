import mongoose from 'mongoose'

export default async function dbQuery(fn) {
    await mongoose.connect(process.env.MONGODB_URI)
    return JSON.parse(JSON.stringify(await fn()))
}