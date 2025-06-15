import {
  createGalleryService,
  deleteGalleryService,
  getAllCategoriesWithGalleriesService,
  getAllGalleriesService,
  getGalleryByIdService,
  updateGalleryService,
} from "./../models/gallery.model.js";
import handleResponse from "./../utils/handleResponse.js";

export const createGallery = async (req, res, next) => {
  try {
    // console.log("Req body",req.body);
    const { categoryId } = req.body;
    console.log("Request file:", req.file);
    console.log("Request files:", req.files);

    
    if (!req.file) {
      return handleResponse(res, 400, "Gallery image is required");
    }

    if (!categoryId) {
      // Delete uploaded file if categoryId is missing
      fs.unlinkSync(req.file.path);
      return handleResponse(res, 400, "Category ID is required");
    }

    const gallery = req.file.path;

    const newGallery = await createGalleryService(categoryId, gallery);
    handleResponse(res, 200, "Gallery successfully created", newGallery);
  } catch (error) {
        console.log(error)
    if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    next(error);
  }
};

export const getAllGalleries = async (req, res, next) => {
  try {
    const galleries = await getAllGalleriesService();

    if (galleries.length === 0)
      return handleResponse(res, 404, "No gallery found");

    handleResponse(res, 201, "Galleries fetched successfully", galleries);
  } catch (error) {
    next(error);
  }
};

export const getCategoriesWithGalleries = async (req, res, next) => {
    try {
        const categoriesWithGalleries = await getAllCategoriesWithGalleriesService();
        
        if (categoriesWithGalleries.length === 0) {
            return handleResponse(res, 404, "No categories found");
        }

        handleResponse(res, 200, "Categories with galleries fetched successfully", categoriesWithGalleries);
    } catch (error) {
        next(error);
    }
};

export const getGalleryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return handleResponse(res, 501, "Gallery id not found");

    const gallery = await getGalleryByIdService(id);

    if (gallery.length === 0)
      return handleResponse(res, 404, "Gallery not found");

    handleResponse(res, 201, "Gallery fetched successfully", gallery);
  } catch (error) {
    next(error);
  }
};

export const updateGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryId, gallery } = req.body;

    const updatedGallery = await updateGalleryService(categoryId, gallery, id);

    handleResponse(res, 201, "Gallery updated successfully", updatedGallery);
  } catch (error) {
    next(error);
  }
};

export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedGallery = await deleteGalleryService(id);

    handleResponse(res, 201, "Gallery deleted successfully", deletedGallery);
  } catch (error) {
    next(error);
  }
};
