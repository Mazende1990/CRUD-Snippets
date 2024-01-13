import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as snippetRouter } from './snippetRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetRouter)
