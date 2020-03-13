const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create and Save a new user
exports.create = (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username
    });

    let err = user.joiValidate(req.body);

    if (err.error) res.send(`${err.error}`);
    else {

        user.password = bcrypt.hashSync(req.body.password, 10);

        user.save()
            .then(data => {
                //On envoie un mail au nouveau user + admins
                //Pour le moment je mets cette foncionnalité en suspend
                //require('../services/nodemailer.service');
                let token = jwt.sign({id: user._id}, "supersecret", {
                    expiresIn: 86400
                });
                res.send({data, tokenUser: token});
            })
            .catch(err => {
                res.status(500).send(err.message);
                return res.status(500);
            });
    }
};

// Find and return all User from the database.
    exports.findAll = (req, res) => {

    console.log("***Quelqu'un appelle findAll users");

    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while finding users."
        });
    });
};

// Find a single user with id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });
};

// Update a user
exports.update = (req, res) => {

    User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role
    }, {new: true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'id') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });

};