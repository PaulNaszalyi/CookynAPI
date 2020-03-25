const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favorisSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    idRecette: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

favorisSchema.methods.joiValidate = (obj) => {
    const Joi = require('@hapi/joi');
    const schema = Joi.object({
        idUser: Joi.string().required().error(new Error('L\'idUser est requis')),
        idRecette: Joi.string().required().error(new Error('L\'idRecette est requis'))
    });

    return(schema.validate(obj));
};


module.exports = mongoose.model('Favorite', favorisSchema);
