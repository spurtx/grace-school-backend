import pool from './../configs/db.js'

export const createCategoryService = async (categoryName) => {
    try {
        const result = await pool.query('INSERT INTO categories (category_name) VALUES ($1) RETURNING *', [categoryName])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const getAllCategoryServices = async () => {
    try {
        const result = await pool.query('SELECT * FROM categories')

        return result.rows
    } catch (error) {
        throw error
    }
}

export const getCategoryByIdService = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id])

        return result.rows
    } catch (error) {
        throw error
    }
}

export const updateCategoryService = async (id, categoryName) => {
    try {
        const result = pool.query('UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *', [categoryName, id])

        return result.rows
    } catch (error) {
        throw error
    }
}

export const deleteCategoryService = async (id) => {
    try {
        const result = pool.query('DELETE FROM categories WHERE category_id = $1 RETURNING *', [id])

        return result.rows
    } catch (error) {
        throw error
    }
}