import { createFolderService, deleteFolderService, getAllFoldersService, getFolderByIdService, updateFolderService } from './../models/folder.model.js'
import handleResponse from './../utils/handleResponse.js'

export const createFolder = async (req, res, next) => {
    try {
        const {folderName} = req.body

        if (!folderName) return handleResponse(res, 501, "Folder name is empty")
        
        const folder = await createFolderService(folderName)

        handleResponse(res, 200, "Folder created successfully", folder)
    } catch (error) {
        next(error)
    }
}

export const getAllFolders = async (req, res, next) => {
    try {
        const folders = await getAllFoldersService()

        if (folders.length === 0) return handleResponse(res, 404, "No folder found")

        handleResponse(res, 201, "Folders fetched successfully", folders)
    } catch (error) {
        next(error)
    }
}

export const getFolderById = async (req, res, next) => {
    try {
        const {id} = req.params

        if (!id) return handleResponse(res, 501, "Folder id not found")

        const folder = await getFolderByIdService(id)

        if (folder.length === 0) return handleResponse(res, 404, "Folder not found")

        handleResponse(res, 201, "Folder fetched successfully", folder)
    } catch (error) {
        next(error)
    }
}

export const updateFolder = async (req, res, next) => {
    try {
        const {id} = req.params
        const {folderName} = req.body

        if (!id || !folderName) return handleResponse(res, 501, "All fields must be filled")

        const updateFolder = await updateFolderService(id, folderName)

        handleResponse(res, 201, "Folder updated successfully", updateFolder)
    } catch (error) {
        nect(error)
    }
}

export const deleteFolder = async (req, res, next) => {
    try {
        const {id} = req.params 

        if (!id) return handleResponse(res, 501, "Folder id not found")
        
        const deletedFolder = await deleteFolderService(id)

        handleResponse(res, 201, "Folder deleted successfully", deletedFolder)
    } catch (error) {
        next(error)
    }
}