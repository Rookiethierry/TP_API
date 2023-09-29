import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js';

//MODEL
import Model from '../models/Player.js';
// avant Router.get('url', () =>)

export const signup = async (req, res, next) => {
    try {
        //requete mongo
        const hashedPassword = await bcrypt.hash(req.body.password, 10)//10 correspond au hachage de 10 à 15
        await Model.create({
            ...req.body,
            password: hashedPassword
        });
        //copie d'un fichier
        res.status(201).json("Player has been created")
    } catch (error) {
        next(error)
    }
}

export const sign = async (req, res) => {
    try {
        //recherche le player par son email dans bdd
        const player = await Model.findOne({ email: req.body.email })
        //si le joueur n'est pas trouvé renvoit une erreur 404
        if (!player) return res.status(404).json("Email not found!")

        //compare le password fourni dans la requête avec le password présent dans la bdd
        const comparePassword = await bcrypt.compare(
            req.body.password,
            player.password
        )
        if (!comparePassword) return res.status(400).json("Wrong Credentials!") //si le mot de passe est incorrect cela envoit une erreur 400

        // créer un jeton JWT pour le joureur avec son id expire après 24h
        //token=jeton

        const token = jwt.sign({ id: player._id }, env.token, { expiresIn: "24h" })

        const { password, ...others } = player._doc// copie de toutes les données du player sauf password

        //envoi du jeton JWT sous forme de cookie HTTPOnly
        res.cookie('access_token', token, {
            httpOnly: true
        })
            .status(200).json(others)//renvoit les données du jouer en réponse à l'exception du mot de passe
    } catch (error) {
        next(error)
    }
}

export const allPlayers = async (req, res, next) => {
    try {
        const players = await Model.find()
        res.status(200).json(players)


    } catch (error) {
        next(error)
    }
}

export const onePlayer = async (req, res, next) => {
    try {
        const { id } = req.params
        const players = await Model.findById(id)
        res.status(200).json(players)
        // console.log(id)
    } catch (error) {
        next(error)
    }
}

export const deletePlayer = async (req, res, next) => {

    try {
        const player = await Model.findById(req.params.id)
        if (!player) return res.status(404).json("Player not found."
        )
        await Model.findByIdAndRemove(req.params.id)
        res.status(200).json("The hero has been deleted")
    } catch (error) {
        next(error)
    }
}
//1 get id
//check player
//3 get req.body 
//4 use findByIdAndUpdate
//MODIFIER
export const putPlayer = async (req, res, next) => {
    try {
        const player = await Model.findById(req.params.id)
        if (!player) return res.status(404).json("Player not found.")
        const updatePlayer = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({ message: "Player updated", updatePlayer })
    }
    catch (error) { next(error) }
}