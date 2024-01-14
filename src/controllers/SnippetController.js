import { SnippetSchema } from '../models/SnippetSchema.js'
import { UserSchema } from '../models/UserSchema.js'

/**
 *
 */
export class SnippetController {
  /**
   * Provide req.doc to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the snippet to load.
   */
  async loadSnippetDocument (req, res, next, id) {
    try {
      const snippetDoc = await SnippetSchema.findById(id)
      req.doc = snippetDoc

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a list of all snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await SnippetSchema.find())
          .map(snippetDoc => snippetDoc.toObject())
      }

      res.render('snippets/index', { viewData, username: req.session.username })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    res.render('snippets/create', { username: req.session.username })
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createPost (req, res) {
    try {
      const user = req.session.username
      const { title, code } = req.body

      await SnippetSchema.create({
        title, code, user
      })

      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      res.redirect('.')
    } catch (error) {
      // req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./create')
    }
  }

  /**
   * Returns a HTML form for updating a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      if (!req.doc) {
        req.session.flash = { type: 'danger', text: 'Snippet not found.' }
        return res.redirect('/snippets')
      }

      // Check if the logged-in user is the same as the user who created the snippet
      if (req.session.username !== req.doc.user) {
        req.session.flash = { type: 'danger', text: 'Unauthorized access.' }
        return res.redirect('/snippets')
      }

      // Render the update form with the snippet data
      res.render('snippets/update', { viewData: req.doc.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('.')
    }
  }

  /**
   * Updates a specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async updatePost (req, res) {
    try {
      if ('title' in req.body) req.doc.title = req.body.title
      if ('code' in req.body) req.doc.code = req.body.code

      if (req.doc.isModified()) {
        await req.doc.save()
        req.session.flash = { type: 'success', text: 'The snippet was updated successfully.' }
      } else {
        req.session.flash = { type: 'info', text: 'The snippet was not updated because there was nothing to update.' }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./update')
    }
  }

  /**
   * Returns a HTML form for deleting a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      if (!req.doc) {
        req.session.flash = { type: 'danger', text: 'Snippet not found.' }
        return res.redirect('/snippets')
      }

      // Check if the logged-in user is the same as the user who created the snippet
      if (req.session.username !== req.doc.user) {
        req.session.flash = { type: 'danger', text: 'Unauthorized access.' }
        return res.redirect('/snippets')
      }
      res.render('snippets/delete', { viewData: req.doc.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deletePost (req, res) {
    try {
      await req.doc.deleteOne()

      req.session.flash = { type: 'success', text: 'The snippet was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }

  /**
   *
   * @param snippet
   * @param currentUser
   */
  isAuthorized (snippet, currentUser) {
    return snippet.user === currentUser
  }
}
