import { UserSchema } from '../models/UserSchema.js'

/**
 *
 */
export class UserController {
  /**
   * Renders the registration page.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async register (req, res) {
    res.render('users/register')
  }

  /**
   * Renders the login page.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async login (req, res) {
    res.render('home/login')
  }
}
