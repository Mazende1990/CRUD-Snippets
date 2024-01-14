import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'
import bcrypt from 'bcrypt'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'The password must be of minimum length 6 charcters']
  }
})

schema.add(BASE_SCHEMA)

// Salts and hashes password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Authenticates a user.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password to be verified.
 * @returns {Promise} The authenticated user object.
 * @throws {Error} If authentication fails.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || (await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attemp')
  }
  return user
}

// Create a model using the schema.
export const UserSchema = mongoose.model('User', schema)
