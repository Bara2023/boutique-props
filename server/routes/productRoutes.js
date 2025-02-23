import express from "express";
import {getMyProducts} from "../controller/productController.js"

const router =express.Router()

router.post("/", getMyProducts)
