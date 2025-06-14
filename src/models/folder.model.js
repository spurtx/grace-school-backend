import pool from './../configs/db.js'

export const createFolderService = async (folderName) => {
    try {
        const result = await pool.query('INSERT INTO folders (folder_name) VALUES ($1) RETURNING *', [folderName])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const getAllFoldersService = async () => {
    try {
        const result = await pool.query('SELECT * FROM folders')

        return result.rows
    } catch (error) {
        throw error
    }
}

export const getFolderByIdService = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM folders WHERE folder_id = $1', [id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const updateFolderService = async (id, folderName) => {
    try {
        const result = await pool.query('UPDATE folders SET folder_name = $1 WHERE folder_id = $2 RETURNING *', [folderName, id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const deleteFolderService = async (id) => {
    try {
        const result = await pool.query('DELETE FROM folders WHERE folder_id = $1 RETURNING *', [id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}