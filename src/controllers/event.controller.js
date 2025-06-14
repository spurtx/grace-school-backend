import {createEventService, getAllEventService, getEventByIdService, updateEventService, deleteEventService} from './../models/event.model.js'
import handleResponse from './../utils/handleResponse.js'

export const createEvent = async (req, res, next) => {
    try {
        const {eventName, eventType, eventStartDate, eventEndDate} = req.body

        const newEvent = await createEventService(eventName, eventType, eventStartDate, eventEndDate)

        handleResponse(res, 201, "Event Create sucessfully", newEvent)
    } catch (error) {
        next(error)
    }
}

export const getAllEvents = async (req, res , next) => {
    try {
        const events = await getAllEventService()

        if (!events) {
            handleResponse(res, 404, "No event found")
        }

        handleResponse(res, 200, "Event fetched successfully", events)
    } catch (error) {
        next(error)
    }
}

export const getEventById = async (req, res, next) => {
    try {
        const {id } = req.params

        const event = await getEventByIdService(id)

        if (!event) {
            handleResponse(res, 404, "Event not found")
        }

        handleResponse(res, 200, "Event fetched successfully", event)
    } catch (error) {
        next(error)
    }
}

export const updateEVent = async (req, res, next) => {
    try {
        const { eventName, eventType, eventStartDate, eventEndDate} = req.body

        const {id} = req.params

        const event = await getEventByIdService(id) 

        if(!event) {
            handleResponse(res, 404, "Event not found")
        }

        const updatedEvent = await updateEventService(id, eventName, eventType, eventStartDate, eventEndDate)

        handleResponse(res, 200, "Event updated successfully", updatedEvent)
    } catch (error) {
        next(error)
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const {id} = req.params

        const event = await getEventByIdService(id) 

        if(!event) {
            handleResponse(res, 404, "Event not found")
        }

        await deleteEventService(id)

        handleResponse(res, 201, "Event deleted successfully")
    } catch (error) {
        next(error)
    }
}