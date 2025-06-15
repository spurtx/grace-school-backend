import express from 'express'
import { createGallery, deleteGallery, getAllGalleries, getCategoriesWithGalleries, getGalleryById, updateGallery } from './../controllers/gallery.controller.js'
import upload from './../configs/multer.js'

const router = express.Router()

router.post('/create-gallery', upload.single('gallery'), createGallery)

router.get('/get-all-galleries', getAllGalleries)

router.get('/categories-with-galleries', getCategoriesWithGalleries);

router.get('/get-gallery/:id', getGalleryById)

router.patch('/update-gallery/:id', updateGallery)

router.delete('/delete-gallery/:id', deleteGallery)

export default router