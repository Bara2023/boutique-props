/* eslint-disable no-unused-vars */
import Product from "../model/productModel.js"
import mongoose from "mongoose"

export const createProduct = async (req, res)=> {
  const {name, price, offer}= req.body

  const newProduct = await Product.create({
    name,
    price,
    offer,
    user: req.user._id,
    message: "product successfully created"
  })

  res.status(201).json({newProduct})
  console.log(newProduct)
}

export const getAllProducts = async (req, res)=> {
  try {
    const allProducts = await Product.find().populate('userId', 'name')
    if (allProducts.length === 0) {
      return res.status(404).json({message: 'aucun produit disponible à la vente'})
      }
      res.json(allProducts)
  } catch (error) {
    console.log('erreur lors de la récuoération', error.message)
    res.status(500).json({message: 'erreur lors de la recup'})
  }
}

export const getMyProducts = async (req, res) => {
  try {
      const products = await Product.find({ user: req.user._id }).populate('user', 'name');
      if (products.length === 0) {
        return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' })
      }
      res.json(products);
  } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error.message);
      res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
}
