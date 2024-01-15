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

  // eslint-disable-next-line jsdoc/require-returns
  /**
   * Doc.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async registerPost (req, res) {
    try {
      const { username, password } = req.body
      const existingUser = await UserSchema.findOne({ username })
      if (existingUser) {
        req.session.flash = { type: 'danger', text: 'Username already taken.' }
        return res.redirect('./register')
      }
      await UserSchema.create({ username, password })
      req.session.flash = { type: 'success', text: 'The user was created successfully.' }
      res.redirect('./login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
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
    res.render('users/login')
  }

  /**
   * Doc.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async loginPost (req, res) {
    try {
      req.session.regenerate(() => {

      })
      const user = await UserSchema.authenticate(req.body.username, req.body.password)

      req.session.username = user.username

      res.redirect('./profile')
    } catch (error) {
      res.redirect('./profile')
    }
  }

  /**
   * Doc.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    try {
      if (!req.session.username) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      } else {
        res.render('users/profile', { username: req.session.username })
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Doc.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  async logout (req, res) {
    req.session.destroy()
    res.redirect('/')
  }
}
