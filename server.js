import express from 'express'
import { env } from "./config/index.js";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';


//ROUTES
import playerRoutes from './routes/player.router.js'
import boutiqueRoutes from './routes/boutique.router.js'
import voitureRoutes from './routes/voiture.router.js'
import agenceRoutes from './routes/agence.router.js'


const app = express();

const PORT = process.env.PORT || 8080

//DATABASE
mongoose
    .connect(env.mongoURL)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(error => console.log(error));

    //MIDDLEWARE
    app.use(express.json());
    app.use(cookieParser());

    //ROUTER
    app.use("/api/player", playerRoutes);
    app.use("/api/boutique", boutiqueRoutes);
    app.use("/api/voiture", voitureRoutes);
    app.use("/api/agence", agenceRoutes);


    //SERVER
app.listen(PORT, () => {
    console.log(`Listenning at http://localhost:${PORT}`);
});