const Favorite = require('../models/favoris.model');

// Create and Save a new favoris
exports.create = (req, res) => {

    const favoris = new Favorite({
        idUser: req.body.idUser,
        idRecette: req.body.idRecette
    });

    let err = favoris.joiValidate(req.body);
    if (err.error) res.send({errmsg: `${err.error}`});
    else {
        favoris.save()
            .then(data => {
                res.send(data.idRecette);
            })
            .catch(err => {
                console.log(err);
                res.send({errmsg: err.message});
            });
    }
};

// Find and return all User from the database.
exports.findAll = (req, res) => {
    Favorite.find()
        .then(favoris => {
            res.send(favoris);
        }).catch(err => {
        res.send({
            errmsg: err.message || "Some error occurred while finding favoris."
        });
    });
};

exports.find = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.send({errmsg: 'Aucune donnée envoyée...'});

    Favorite.find({idUser: req.body.idUser, idRecette: req.body.idRecette})
        .then(data => {
            if (!data[0]) res.send({found: false});
            else res.send({found: true});
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                errmsg: "Favoris not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            errmsg: "Error retrieving Favoris with id " + req.params.id
        });
    });
};

exports.findAllFavsByUser = (req, res) => {
    if (!req.params.id || req.params.id === "")
        return res.send({errmsg: 'Aucune donnée envoyée...'});

    Favorite.find({idUser: req.params.id})
        .then(data => {
            console.log(data)
            if (!data[0]) res.send({errmsg: "Vous n'avez aucun favoris"});
            else {
                let ids = []
                data.forEach(recipe => {
                    ids.push(recipe.idRecette)
                })
                res.send(ids);
            }
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                errmsg: "Favoris not found"
            });
        }
        return res.status(500).send({
            errmsg: "Error retrieving Favoris"
        });
    });
};

// Find a single user with id
exports.findOne = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.send({errmsg: 'Aucune donnée envoyée...'});

    Favorite.findById(req.params.id)
        .then(favoris => {
            if (!favoris) {
                return res.status(404).send({
                    errmsg: "favoris not found with id " + req.params.id
                });
            }
            res.send(favoris);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                errmsg: "favoris not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            errmsg: "Error retrieving favoris with id " + req.params.id
        });
    });
};

// Update a user
exports.update = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.send({errmsg: 'Aucune donnée envoyée...'});

    Favorite.findByIdAndUpdate(req.params.id, {
        idUser: req.body.idUser,
        idRecette: req.body.idRecette
    }, {new: true})
        .then(favoris => {
            if (!favoris) {
                return res.status(404).send({
                    errmsg: "favoris not found with id " + req.params.id
                });
            }
            res.send(favoris);
        }).catch(err => {
        if (err.kind === 'id') {
            return res.status(404).send({
                errmsg: "favoris not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            errmsg: "Error updating favoris with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.send({errmsg: 'Aucune donnée envoyée...'});

    Favorite.deleteMany({idUser: req.body.idUser, idRecette: req.body.idRecette})
        .then(favoris => {
            /*returns an object that contains three fields:
                n – number of matched documents
                ok – 1 if the operation was successful
                deletedCount – number of deleted documents
            */
            if (favoris.deletedCount <= 0)
                return res.send({
                    errmsg: "Favoris non trouvé"
                });
            else res.send(req.body.idRecette);
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                errmsg: "favoris not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            errmsg: "Could not delete favoris with id " + req.params.id
        });
    });

};
