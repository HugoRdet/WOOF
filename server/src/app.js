const path = require('path');
const api = require('./api.js');
var uuid=require('node-uuid');
// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
var usersDB = new sqlite3.Database(':memory:');
const Datastore = require('nedb');
var messagesDB = new Datastore('./db/messages.db');

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
  
  genid: (req) => {
    var uuid_tmp=uuid()
    return uuid_tmp;
  },
  secret: "Big Brother Is Watching You",
  resave: true,
  saveUninitialized: true,
}))




app.use('/api', api.default(usersDB, messagesDB));

// Démarre le serveur
app.on('close', () => {
  userDb.close();
});
exports.default = app;
