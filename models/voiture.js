import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const voitureSchema = mongoose.Schema(
    {
        id_agence:{ type: String, required: true},
        titre:{ type: String, required: true},
        marque:{ type: String, required: true},
        modele:{ type: String, required: true},
        description:{ type: Text, required: true},
        photo :{ type: String, required: true},
        prix_journalier:{ type: Integer, required: true},
    },
    {timestamps: { createdAt: true }}
)

voitureSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Voiture", voitureSchema)
