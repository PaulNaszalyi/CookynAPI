const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 128
    },
    firstname: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    }
}, {
    timestamps: true
});

userSchema.methods.joiValidate = (obj) => {
    const Joi = require('@hapi/joi');
    const schema = Joi.object({
        email: Joi.string().required().error(new Error('L\'email est requis')),
        password: Joi.string().required().error(new Error('Le password est requis')),
        firstname: Joi.string().required().error(new Error('Le prénom est requis')),
        lastname: Joi.string().required().error(new Error('Le nom est requis')),
    });

    return(schema.validate(obj));
};


module.exports = mongoose.model('User', userSchema);
