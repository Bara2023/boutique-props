import Product from "../model/productModel.js"

export const getMyProducts = async (userId)=>{
  try{
    const myProducts = await Product.find({user: userId}).populate("user")
    console.log(myProducts)

  } catch(error) {
    console.log(error)
  }
}
