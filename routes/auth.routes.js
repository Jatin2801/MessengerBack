import express from 'express'
import { login, logout, signup } from '../controllers/auth.contro.js'

const router = express.Router()

router.post('/login',login) //we will make controllers to use funcs. of these routes

router.post('/signup',signup) // login , signup and logout are middleware/controller here 

router.post('/logout',logout)

export default router;