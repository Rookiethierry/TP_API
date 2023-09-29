export const createError = (status, message) => {
    //crée une nouvelle instance d'erreur vide
    const error = new Error()
    //on definit le code d'état de l'erreur en fonction du paramètre "status"
    error.status = status
    //on definit le message d'erreur en fonction du paramètre message
    error.message = message
    //renvoit l'instance d'erreur personnalisée
    return error
}