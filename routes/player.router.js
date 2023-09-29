import espress from "express"
import { verifieToken } from "../Middlewares/auth.js";

import { signup, allPlayers, onePlayer, deletePlayer, putPlayer, sign } from "../controllers/player.controller.js";

const router = espress.Router();

router.post("/signup", signup);

router.post("/sign", sign);

router.get("/all", allPlayers);//en get pas besoin de Json car on envoit pas de données

router.get("/findById", onePlayer);

router.delete("/delete/:id", verifieToken, deletePlayer);

router.put("/update/:id", verifieToken, putPlayer);
//on place le la verif sur les fonctions qui appellent une vérification


export default router;