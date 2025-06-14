import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js'

const router = express.Router()

router.post('/create-category', createCategory)

router.get('/get-all-categories', getAllCategories)

router.get('/get-category/:id', getCategoryById)

router.patch('/update-category/:id', updateCategory)

router.delete('/delete-category/:id', deleteCategory)

export default router