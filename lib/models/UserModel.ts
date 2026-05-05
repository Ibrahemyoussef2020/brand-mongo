import mongoose from "mongoose";


export type User = {
    _id: string
    static_id:string
    name: string
    email: string
    role: string
}


const UserSchema = new mongoose.Schema(
    {
      static_id: { type: String, required: false },
      name: {type: String, required: true},
      email: {type: String,   required: true, unique: true },
      image: { type: String, required: false },
      password: {type: String, required: false},
      role: { type: String, enum: ['super_admin', 'ecommerce_admin', 'pos_admin', 'user'], default: 'user' },
    },
    { timestamps: true }
  )

  const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema)

export default UserModel