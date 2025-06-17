import handleResponse from '../utils/handleResponse.js'
import { createContentService, deleteContentService, getAllContentService, getContentByFolderService, getContentByIdService, updateContentService } from './../models/content.model.js'

export const createContent = async (req, res, next) => {
    try {
        const { folderId} = req.body

        if(!req.file) return handleResponse(res, 400, "Content is required")

        if (!folderId) {
            fs.unlinkSync(req.file.path)
            return handleResponse(res, 400, "Folder Id is required")
        }

        const content = req.file.path

        const newContent = await createContentService(folderId, content)

        handleResponse(res, 200, "Content successfully created", newContent)
    } catch (error) {
        if(req.file) {
            fs.unlinkSync(req.file.path)
        }
        next(error)
    }
}

export const getAllContent = async (req, res, next) => {
    try {
        const contents = await getAllContentService()

        if (contents.length === 0) return handleResponse(res, 404, "No content found")

        handleResponse(res, 201, "Contents fetched successfully", contents)
    } catch (error) {
        next(error)
    }
}

export const getContentByFolder = async (req, res, next) => {
    try {
        const {folderId} = req.params

        const contents = await getContentByFolderService(folderId)

        if(contents.length === 0) return handleResponse(res, 404, "No contents found in the folder")

        handleResponse(res, 201, "Contents successfully fetched", contents)
    } catch (error) {
        next(error)
    }
}

export const getContentById = async (req, res, next) => {
    try {
        const {id} = req.params

        const content = await getContentByIdService(id)

        if (!content) return handleResponse(res, 404, "No content found")

        handleResponse(res, 201, "Content fetched successfully", content)
    } catch (error) {
        next(error)
    }
}

export const updateContent = async (req, res, next) => {
    try {
        const {folderId, content} = req.body
        const {id} = req.params

        const updatedContent = await updateContentService(folderId, content, id)

        handleResponse(res, 201, "Content successfully updated", updatedContent)
    } catch (error) {
        next(error)
    }
}

export const deletContent = async (req, res, next) => {
    try {
        const {id} = req.params

        const content = await getContentByIdService(id)

        if(!content) return handleResponse(res, 404, "Content not found")

        const deletedContent = await deleteContentService(id)

        handleResponse(res, 201, "Content deleted successfully", deletedContent)
    } catch (error) {
        next(error)
    }
}