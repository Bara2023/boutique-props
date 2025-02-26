import express from 'express'
import { createProduct, getMyProducts, getAllProducts } from '../controller/productController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/', protect, createProduct);
router.get('/my-products', protect, getMyProducts)
router.get('/offers', getAllProducts)

export default router
