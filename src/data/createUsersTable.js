import pool from "../configs/db.js"

const createUsersTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS users (
        user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL UNIQUE,
        user_password TEXT NOT NULL,
        user_role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
    )
    `

    try {
        await pool.query(queryText)
        console.log("Users table created successfully")
    } catch (error) {
        console.error("Error creating users table:", error)
        throw error
    }
}

export default createUsersTable