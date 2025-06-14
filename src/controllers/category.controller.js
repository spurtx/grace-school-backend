import {createCategoryService, deleteCategoryService, getAllCategoryServices, getCategoryByIdService, updateCategoryService} from './../models/category.model.js'
import handleResponse from '../utils/handleResponse.js'

export const createCategory = async (req, res, next) => {
    try {
        const {categoryName} = req.body

        if (!categoryName) return handleResponse(res, 501, "Category name is empty")

        const newCategory = await createCategoryService(categoryName)

        handleResponse(res, 201, "Category Created successfully", newCategory)
    } catch (error) {
        next(error)
    }
}

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await getAllCategoryServices()

        if (!categories) return handleResponse(res, 404, "Categories not found")

        handleResponse(res, 201, "Categories fetched successfully", categories)
    } catch (error) {
        next(error)
    }
}

export const getCategoryById = async (req, res, next) => {
    try {
        const {id} = req.params

        if (!id) return handleResponse(res, 501, "Category id not found")

        const category = await getCategoryByIdService(id) 

        if (category.length === 0) return handleResponse(res, 404, "Category not found")

        handleResponse(res, 201, "Category fetched successfully", category)
    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const {id} = req.params
        const {categoryName} = req.body

        if (!id) return handleResponse(res, 501, "Category id not found")
        
        if (!categoryName) return handleResponse(res, 501, "Category name must not be empty")
        
        const updatedCategory = await updateCategoryService(id, categoryName)

        handleResponse(res, 201, "Category updated successfully", updatedCategory)
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const {id} = req.params

        if (!id) return handleResponse(res, 501, "Category id not found")

        const deletedCategory = await deleteCategoryService(id)

        handleResponse(res, 201, "Category deleted successfully", deletedCategory)
    } catch (error) {
        next(error)
    }
}