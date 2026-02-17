import mongoose from "mongoose";

export type LocalizedString = {
    en?: string;
    ar?: string;
};

export type Flags = {
    _id: string
    static_id?: string
    image: string
    title: LocalizedString
    description: string
}

const FlagSchema = new mongoose.Schema(
    {
        static_id: { type: String, required: false },
        image: { type: String, required: true },
        title: {
            en: { type: String },
            ar: { type: String }
        },
        description: { type: String, required: true },
    },
    { timestamps: true }
)

const FlagModel = mongoose.models?.Flag || mongoose.model('Flag', FlagSchema)

export default FlagModel