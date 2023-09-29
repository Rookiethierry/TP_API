import espress from "express"
import { verifieToken } from "../Middlewares/auth.js";

import { signup, allAgences, oneAgence, deleteAgence, putAgence, sign } from "../controllers/agence.controller.js";

const router = espress.Router();

router.post("/signup", signup);

router.post("/sign", sign);

router.get("/all", allAgences);//en get pas besoin de Json car on envoit pas de données

router.get("/findById", oneAgence);

router.delete("/delete/:id", verifieToken, deleteAgence);

router.put("/update/:id", verifieToken, putAgence);
//on place le la verif sur les fonctions qui appellent une vérification


export default router;