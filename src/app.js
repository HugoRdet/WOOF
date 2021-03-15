const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
var userDb = new sqlite3.Database(':memory:');

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");


app.use('/api', api.default(userDb));

// Démarre le serveur
app.on('close', () => {
  userDb.close();
});
exports.default = app;
