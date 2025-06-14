import pool from './../configs/db.js'

export const createEventService = async (eventName, eventType, eventStartDate, eventEndDate) => {
    try {
        const result = await pool.query('INSERT INTO events (event_name, event_type, event_startDate, event_endDate) VALUES ($1, $2, $3, $4) RETURNING *', [eventName, eventType, eventStartDate, eventEndDate])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const getAllEventService = async () => {
    try {
        const result = await pool.query('SELECT * FROM events')

        return result.rows
    } catch (error) {
        throw error
    }
}

export const getEventByIdService = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM events WHERE event_id = $1', [id])

        return result.rows[0]
    } catch (error) {
        
    }
}

export const updateEventService = async (id, eventName, eventType, eventStartDate, eventEndDate) => {
    try {
        const result = await pool.query('UPDATE events SET event_name = $1, event_type = $2 , event_startDate = $3, event_endDate = $4 WHERE event_id = $5 RETURNING *', [eventName, eventType, eventStartDate, eventEndDate, id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

export const deleteEventService = async (id) => {
    try {
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}