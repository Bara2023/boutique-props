import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
},
{timestamp: true}
)

export default mongoose.model('User', userSchema)
