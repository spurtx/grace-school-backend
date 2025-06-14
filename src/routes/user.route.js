import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, loginUser, updateUser } from '../controllers/user.controller.js'
import validateUser from '../middlewares/inputValidator.js'
import validateLogin from '../middlewares/loginValidator.js'
import { authenticateToken } from '../middlewares/authorization.js'

import {jwtTokens} from './../utils/jwt.helpers.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const router = express.Router()

// Signup route
router.post('/add-user', validateUser, createUser )

// Login route
router.post('/login', validateLogin, loginUser )

router.delete('/logout', (req, res) => {
    try {
        res.clearCookie('refresh_token')

        return res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        res.status(401).json({error: error.message})
    }
})

// Get all users by id route
router.get('/get-all-users', authenticateToken, getAllUsers )

// Get user by id route
router.get('/get-user-by-id/:id', getUserById )

// Get user by email route
router.get('/get-user-by-email/:email', getUserByEmail )

// Update user by id route
router.patch('/update-user/:id', validateUser, updateUser )

// Delete user by id
router.delete('/delete-user/:id', deleteUser )

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token
        if(refreshToken == null) return res.status(401).json({error: "Null refresh token"})

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({error: error.message})

            const tokens = jwtTokens(user)
            res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true})
            res.json(tokens)
        }) 
    } catch (error) {
        res.status(401).json({error: error.message})
    }
})

export default router