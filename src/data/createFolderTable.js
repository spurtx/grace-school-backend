import pool from "../configs/db.js"

const createFolderTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS folders (
        folder_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        folder_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
    `

    try {
        await pool.query(queryText)
        console.log("Folders table created successfully")
    } catch (error) {
        console.error("Error creating folders table:", error)
        throw error
    }
}

export default createFolderTable