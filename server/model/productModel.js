import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  offer: {type: Boolean},
  user: {type: mongoose.Types.OblectId, ref: 'User'}
},
{timestamp: true}
)
export default mongoose.model('Product', productSchema)
