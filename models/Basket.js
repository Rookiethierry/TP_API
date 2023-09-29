import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const basketSchema = mongoose.Schema(
    {
        name: { type: String, required: true},
        price: { type: String, required: true},
        content: { type: String, required: true},
        stars: { type: String, required: true},
        image: { type: String, required: true},
        pseudo: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true}
    },
)

basketSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Basket", basketSchema)