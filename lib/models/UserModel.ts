import mongoose from "mongoose";


export type User = {
    _id: string
    static_id:string
    name: string
    email: string
    isAdmin: boolean
}


const UserSchema = new mongoose.Schema(
    {
      static_id: { type: String, required: false },
      name: {type: String, required: true},
      email: {type: String,   required: true, unique: true },
      image: { type: String, required: false },
      password: {type: String, required: false},
      isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
  )

  const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema)

export default UserModel