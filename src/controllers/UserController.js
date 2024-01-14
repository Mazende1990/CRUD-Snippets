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
   *
   * @param req
   * @param res
   */
  async registerPost (req, res) {
    try {
      const { username, password } = req.body

      await UserSchema.create({
        username, password
      })

      req.session.flash = { type: 'success', text: 'The user was created successfully.' }
      res.redirect('.')
    } catch (error) {
      // req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./register')
    }
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

  /**
   *
   * @param req
   * @param res
   */
  async loginPost (req, res) {

  }
}
