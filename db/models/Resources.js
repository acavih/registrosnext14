import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, default: '' },
  archived: { type: Boolean, default: false }
})

/**
 * @type {import('mongoose').Model}
 */
export const ResourceModel = mongoose.models.resources || mongoose.model('resources', resourceSchema)

export default ResourceModel