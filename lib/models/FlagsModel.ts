import mongoose from "mongoose";


export type Flags = {
    _id: string
    static_id?:string
    image: string
    title: string
    description: boolean
}


const UserSchema = new mongoose.Schema(
    {
        static_id: { type: String, required: false },
        image: {type: String, required: true},
        title: {type: String,   required: true},
        description: {type: String, required: true},
    },
    { timestamps: true }
  )

  const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema)

export default UserModel