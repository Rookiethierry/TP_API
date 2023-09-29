import espress from "express"

import {  signup,allBaskets, oneBasket, deleteBasket, putBasket, sign } from "../controllers/basket.controller.js";

const router = espress.Router();

router.post("/signup", signup);

router.post("/sign", sign);

router.post("/add", oneBasket);

router.get("/all", allBaskets);

router.get("/findById", oneBasket);

router.delete("/delete/:id", deleteBasket);

router.put("/update/:id", putBasket);

export default router;