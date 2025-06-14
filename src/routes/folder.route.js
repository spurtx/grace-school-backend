import express from 'express'
import { createFolder, deleteFolder, getAllFolders, getFolderById, updateFolder } from './../controllers/folder.controller.js'

const router = express.Router()

router.post('/create-folder', createFolder)

router.get('/get-all-folders', getAllFolders)

router.get('/get-folder/:id', getFolderById)

router.patch('/update-folder/:id', updateFolder)

router.delete('/delete-folder/:id', deleteFolder)

export default router