import pool from '../configs/db.js'

export const getAllUsersService = async () => {
    try {
        const result = await pool.query('SELECT * FROM users')
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getUserByIdService = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const getUserByEmailService = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const createUserService = async (username, email, password) => {
    try {
        const result = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [username, email, password])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const loginUserService = async (email, password) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const updateUserService = async (id, name, email) => {
    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const deleteUserService = async (id) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}