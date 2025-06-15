import pool from './../configs/db.js'

export const createGalleryService = async (categoryId, gallery) => {
    try {
        const result = await pool.query(
            'INSERT INTO galleries (category_id, gallery) VALUES ($1, $2) RETURNING *',
            [categoryId, gallery]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const getAllGalleriesService = async () => {
    try {
        const result = await pool.query('SELECT * FROM galleries')

        return result.rows
    } catch (error) {
        
    }
}

export const getGalleryByIdService = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM galleries WHERE gallery_id = $1', [id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const getAllCategoriesWithGalleriesService = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                c.category_id,
                c.category_name,  /* Changed from c.name to c.category_name */
                COALESCE(
                    json_agg(
                        json_build_object(
                            'gallery_id', g.gallery_id,
                            'gallery_path', g.gallery
                        )
                    ) FILTER (WHERE g.gallery_id IS NOT NULL),
                    '[]'
                ) as galleries
            FROM categories c
            LEFT JOIN galleries g ON c.category_id = g.category_id
            GROUP BY c.category_id, c.category_name
            ORDER BY c.category_id
        `);

        return result.rows;
    } catch (error) {
        throw error;
    }
}

export const updateGalleryService = async ( categoryId, gallery, galleryId) => {
    try {
        const result = await pool.query('UPDATE galleries SET category_id = $1, gallery = $2 WHERE gallery_id = $3', [categoryId, gallery, galleryId])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const deleteGalleryService = async (id) => {
    try {
        const result = await pool.query('DELETE FROM galleries WHERE gallery_id = $1', id)

        return result.rows[0]
    } catch (error) {
        
    }
}