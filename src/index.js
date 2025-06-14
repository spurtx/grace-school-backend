import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

import pool from './configs/db.js'
import userRoutes from './routes/user.route.js'
import errorHanding from './middlewares/errorHandler.js'
import createUsersTable from './data/createUsersTable.js';
import creatEventsTable from './data/createEventTable.js'
import eventRoute from './routes/events.route.js'
import createCategoryTable from './data/createCategoryTable.js';
import categoryRoute from './routes/category.route.js'
import createFolderTabl from './data/createFolderTable.js'
import folderRoute from './routes/folder.route.js'

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {credentiials: true, origin: process.env.URL || '*'}



// Middlewares
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/', express.static(join(__dirname, 'public')))

// Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/event', eventRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/folder', folderRoute)

// Error handling middleware
app.use(errorHanding)

// Create tables before starting the app
createUsersTable()
creatEventsTable()
createCategoryTable()
createFolderTabl()


// Testing POSTGRESQL Connection
app.get('/', async(req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`Database name is: ${result.rows[0]}`)
})

// Server running
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})