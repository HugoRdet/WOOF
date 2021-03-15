const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
var usersDB = new sqlite3.Database('./db/users.db');
const Datastore = require('nedb');
var messagesDB = new Datastore('./db/messages.db');

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
  genid: (req) => {
    console.log("inside the middleware session");
    console.log(req.sessionID);
    return uuid();
  },
  secret: "Big Brother Is Watching You",
  resave: false,
  saveUninitialized: true
}))



app.use('/api', api.default(usersDB, messagesDB));

// Démarre le serveur
app.on('close', () => {
  userDb.close();
});
exports.default = app;
