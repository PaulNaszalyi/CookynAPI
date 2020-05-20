const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recetteSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 128
    },
    description: {
        type: String,
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

recetteSchema.methods.joiValidate = (obj) => {
    const Joi = require('@hapi/joi');
    const schema = Joi.object({
        idUser: Joi.string().required().error(new Error('L\'idUser est requis')),
        name: Joi.string().max(30, 'utf8').required().error(new Error('Le nom de la recette n\'est pas renseigné ou est trop long')),
        description: Joi.string().required().error(new Error('La description est requise')),
        steps: Joi.string().required().error(new Error('Les steps sont requises')),
        ingredients: Joi.string().required().error(new Error('Les ingrédients sont requis')),
        photo: Joi.string().required().error(new Error('La photo est requise'))
    });

    return(schema.validate(obj));
};


module.exports = mongoose.model('Recette', recetteSchema);
