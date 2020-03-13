const mongoose = require('mongoose');

exports.connect = (url) => {
    mongoose.connect(url, { useNewUrlParser: true , useCreateIndex: true}).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database.', err);
        process.exit();
    });
};
