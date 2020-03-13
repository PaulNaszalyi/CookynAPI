const dbConfig = require('./db.config');
const jwtConfig = require('./jwt.config');
const serverConfig = require('./server.config');

exports.database = dbConfig;
exports.jwt = jwtConfig;
exports.server = serverConfig;
