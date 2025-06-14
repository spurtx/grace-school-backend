import pool from "../configs/db.js"

const createEventTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS events (
        event_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        event_name TEXT NOT NULL,
        event_type TEXT NOT NULL,
        event_startDate TEXT NOT NULL,
        event_endDate TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
    `

    try {
        await pool.query(queryText)
        console.log("Events table created successfully")
    } catch (error) {
        console.error("Error creating events table:", error)
        throw error
    }
}

export default createEventTable