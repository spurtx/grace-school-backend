import pool from "../configs/db";

export const createContentService = async (folderId, content) => {
    try {
        const result = await pool.query('INSERT INTO contents (folder_id, content) VALUES ($1, $2) RETURNING *', [folderId, content])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const getAllContentService = async () => {
    try {
        const result = await pool.query('SELECT * FROM contents')

        return result.rows
    } catch (error) {
        throw error
    }
}

export const getContentByFolderService = async (folderId) => {
    try {
        const result = await pool.query('SELECT * FROM contents WHERE folder_id = $1',[folderId])

        return result.rows
    } catch (error) {
        throw error
    }
}

export const getContentByIdService = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM contents WHERE content_id = $1',[id])

        return result.rows
    } catch (error) {
        throw error
    }
}

export const updateContentService = async (id, folderId, content) => {
    try {
        const result = await pool.query('UPDATE contents SET (folder_id = $1, content = $2) WHERE content_id = $3', [folderId, content, id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const deleteContentService = async (id) => {
    try {
        const result = await pool.query('DELETE FROM contents WHERE content_id = $1 RETURNING *', [id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}