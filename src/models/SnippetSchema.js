import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  code: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  user: {
    type: String,
    required: true
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const SnippetSchema = mongoose.model('Snippet', schema)
