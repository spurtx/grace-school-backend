import pool from "../configs/db.js"

const createCategoryTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS categories (
        category_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        category_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
    `

    try {
        await pool.query(queryText)
        console.log("Categories table created successfully")
    } catch (error) {
        console.error("Error creating categories table:", error)
        throw error
    }
}

export default createCategoryTable