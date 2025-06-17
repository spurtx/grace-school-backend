import pool from "../configs/db.js"

const createContentTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS contents (
    content_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    folder_id uuid REFERENCES folders(folder_id),
    content TEXT NOT NULL,
    content_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);
    `

    try {
        await pool.query(queryText)
        console.log("Contents table created successfully")
    } catch (error) {
        console.error("Error creating contents table:", error)
        throw error
    }
}

export default createContentTable