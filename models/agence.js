import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const agenceSchema = mongoose.Schema(
    {
        titre:{ type: String, required: true},
        adresse:{ type: String, required: true},
        ville:{ type: String, required: true},
        cp:{ type: Integer, required: true},
        description:{ type: String, required: true},
        photo:{ type: String, required: true},
    },
    {timestamps: { createdAt: true }}
)

agenceSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("agence", agenceSchema)
