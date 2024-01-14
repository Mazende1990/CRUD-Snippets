import express from 'express'
import { UserController } from '../controllers/UserController.js'

export const router = express.Router()

const controller = new UserController()

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/login', (req, res, next) => controller.login(req, res, next))

router.get('/register', (req, res, next) => controller.register(req, res, next))

router.post('/register', (req, res, next) => controller.registerPost(req, res, next))

router.post('/login', (req, res, next) => controller.loginPost(req, res, next))

router.get('/profile', (req, res, next) => controller.profile(req, res, next))

router.get('/logout', (req, res, next) => controller.logout(req, res, next))
