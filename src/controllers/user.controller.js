import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

import { createUserService, deleteUserService, getAllUsersService, getUserByEmailService, getUserByIdService, loginUserService, updateUserService } from "../models/user.model.js";
import { jwtTokens } from "../utils/jwt.helpers.js";

// Standadized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
    try {
        const {username, email, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUserService(username, email, hashedPassword)
        handleResponse(res, 201, "User Created Successfully", newUser)
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await loginUserService(email, password)

        console.log("user:", user)

        if(!user) return handleResponse(res, 404, "User not found")
        
        const validPassword = await bcrypt.compare(password, user.user_password)
    
        if (!validPassword) return handleResponse(res, 401, "Incorrect password")

        let tokens = jwtTokens(user)

        console.log("Tokens: ", tokens)

        res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true})

        // res.json(tokens)

        handleResponse(res, 200, "User logged in Successfully", tokens)
        
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {

        const users = await getAllUsersService()
        handleResponse(res, 200, "Users fetched Successfully", users)
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await getUserByIdService(id)
        if(!user) return handleResponse(res, 404, "User not found")
        handleResponse(res, 200, "User fetched Successfully", user)
    } catch (error) {
        next(error)
    }
}

export const getUserByEmail = async (req, res, next) => {
    try {
        const {email} = req.params
        const user = await getUserByEmailService(email)
        if(!user) return handleResponse(res, 404, "User not found")
        handleResponse(res, 200, "User fetched Successfully", user)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const {name, email} = req.body

        const updatedUser = await updateUserService(id, name, email)
        if(!updatedUser) return handleResponse(res, 404, "User not found")
        handleResponse(res, 200, "User updated Successfully", updatedUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const deletedUser = await deleteUserService(id)
        if(!deletedUser) return handleResponse(res, 404, "User not found")
        handleResponse(res, 200, "User deleted Successfully", deletedUser)
    } catch (error) {
        next(error)
    }
}