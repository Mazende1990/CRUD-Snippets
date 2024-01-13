import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const SnippetSchema = mongoose.model('Task', schema)
