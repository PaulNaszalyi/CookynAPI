const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');


exports.sign = (req, res, next) => {

    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, "supersecret", function(err, decoded) {
        if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        User.findById(decoded.id, {password: 0}, function(err, user) {
            if(err) return res.status(500).send("There was a problem finding the user.");
            if(!user) return res.status(404).send("No user found.");

            next(user);
        });
    });

};

exports.login = (req, res) => {

    console.log(req.body);

    //On récupère les infos du user, notamment le mot de passe pour le comparer
    User.findOne({username: req.body.username}, function(err, user) {

        if(err) return res.status(500).send('Error on the server.');

        if(!user) return res.send({errmsg: 'Username incorrect'});

        if(bcrypt.compareSync(req.body.password, user.password)) {
            // res == true
            let token = jwt.sign({id: user._id}, "supersecret", {
                expiresIn: 86400
            });

            return res.status(200).send({
                idUser: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                token: token
            });
        } else return res.send({errmsg: 'Identifiants incorrects'});

    });

};

exports.logout = (req, res) => {
    res.status(200).send({auth: false, token: null});
};
