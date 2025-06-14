import express from 'express'
import {createEvent, deleteEvent, getAllEvents, getEventById, updateEVent} from './../controllers/event.controller.js'

const router = express.Router()

// Create event route 
router.post('/create-event', createEvent)

// get all events route
router.get("/get-all-events", getAllEvents) 

// get event by id
router.get("/get-event/:id", getEventById) 

// Update event
router.patch("/update-event/:id", updateEVent) 

// Delete event
router.delete("/delete-event/:id", deleteEvent) 

export default router