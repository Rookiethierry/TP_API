import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { createError } from './error.js'

export const verifieToken = (req, res, next) => {
    //Récupère le jeton (token) JWT à partir des cookies de la, requête
    const token = req.cookies.access_token;
    console.log(token);

    //vérifie si le jeton est présent en cas d'absence il renvoit une erreur 401 (accès refusé)
    if(!token) return next(createError(401, "Access Denied"))
    //Vérifier la validité du jeton en utilisant jwt.verify
    jwt.verify(token, env.token, (err, player) => {
        // si une erreurs'est produite lors de la vérif du jeton on envoit une erreur 
        if(err) {
//renvoit une 403 (interdit) car le jeton (token) n'est pas valide
return next(createError(403, "token non valide!"))
        }

        //si la verification réussie ajoute les info du joueur dans l'objet req
        req.player = player
        next()
    })
}