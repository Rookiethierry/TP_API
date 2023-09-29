import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js';

//MODEL
import Model from '../models/Basket.js';
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
        res.status(201).json("the data basket has been created")
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
export const addBaskets = async (req, res, next) => {

    data.push({
        name: "nike air jordan",
        price: 200,
        content: "sport",
        stars: 4,
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/24750e81-85ed-4b0e-8cd8-becf0cd97b2f/chaussure-air-jordan-1-mid-pour-5W9lRJ.png"
    })
    res.status(200).json(data)
}

export const allBaskets = async (req, res, next) => {
    try {
        const baskets = await Model.find()
        res.status(200).json(baskets)


    } catch (error) {
        next(error)
    }
}

export const oneBasket = async (req, res, next) => {
    try {
        const { id } = req.params
        const baskets = await Model.findById(id)
        res.status(200).json(baskets)
        // console.log(id)
    } catch (error) {
        next(error)
    }
}

export const deleteBasket = async (req, res, next) => {

    try {
        const basket = await Model.findById(req.params.id)
        if (!basket) return res.status(404).json("basket not found."
        )
        await Model.findByIdAndRemove(req.params.id)
        res.status(200).json("basket been deleted")
    } catch (error) {
        next(error)
    }
}
//MODIFIER
//1 get id
//check basket
//3 get req.body 
//4 use findByIdAndUpdate
export const putBasket = async (req, res, next) => {
    try {
        const basket = await Model.findById(req.params.id)
        if (!basket) return res.status(404).json("basket not found."
        )
        await Model.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: "basket updated", updatebasket })

        res.status(201).json(token)
    } catch (error) {
        next(error)
    }
    //     req.body= {$set: req.body },
    //  {new: true}
}