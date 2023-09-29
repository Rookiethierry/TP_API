import espress from "express"
import { verifieToken } from "../Middlewares/auth.js";

import { signup, allVoitures, oneVoiture, deleteVoiture, putVoiture, sign } from "../controllers/voiture.controller.js";

const router = espress.Router();

router.post("/signup", signup);

router.post("/sign", sign);

router.get("/all", allVoitures);//en get pas besoin de Json car on envoit pas de données

router.get("/findById", oneVoiture);

router.delete("/delete/:id", verifieToken, deleteVoiture);

router.put("/update/:id", verifieToken, putVoiture);
//on place le la verif sur les fonctions qui appellent une vérification


export default router;