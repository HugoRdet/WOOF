const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");

function init(usersDB, messagesDB) {
    
    const router = express.Router();
    router.use(express.json());
    router.use((req, res, next) => {
        
        /*
        !
        !
        ! OPTIONS PRATIQUES POUR LE DEBUGGAGE
        !
        !
        */
        
        //console.log('API: method %s, path %s', req.method, req.path);
        //console.log('Body', req.body);
        next();
    });

    const users = new Users.default(usersDB);
    const message = new Messages.default(messagesDB);
    message.open();

    router.post("/user/login", async (req, res) => {
        
        try {
            
            const { login, password } = req.body;
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            
            
            
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.login(login, password);
            if (userid) {
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        req.session.userid = userid;
                        
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    /*
    !
    !
    ! A REFLECHIR
    !
    !
    */
    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    }).delete((req, res, next) => res.send(`delete user ${req.params.user_id}`)); // ??????

    /*
    !
    !
    ! A REFLECHIR
    !
    !
    */
        
    router.put("/user/create", (req, res) => {
        const { login, password, pseudo } = req.body;
        if (!login || !password || !pseudo) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, pseudo)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    router
        .route("/user/display/:pseudo(\\d+)")
        .get(async (req, res) => {
        try {
            const message = await message.getMessageByAuthor(req.params.pseudo);
            if (!message)
                res.sendStatus(404);
            else
                res.send(message);
        }
        catch (e) {
            res.status(500).send(e);
        }
    });
    
        router.put("/message/logout", (req, res) => {
            if(req.session.userid == undefined) {
                /*Dans le cas ou aucun utilisateur n'est connecté:*/
                res.status(400).send("a ghost can't log out");
            }else{
                //un utilisateur est connecté
                req.session.destroy((err) => { })
                .then(() => res.send({response: "logout successfull"}))
                .catch((err) => res.status(500).send(err));
                
            }
        });

    router.put("/message/write", (req, res) => {
        
        if(req.session.userid == undefined) {
            /*Dans le cas ou aucun utilisateur n'est connecté:*/
            res.status(400).send("a ghost can't tweet");
        }else{
            //un utilisateur est connecté
            const { content , parent_id } = req.body;
            if (!content) {
                res.status(400).send("Missing fields");
            } else {
                message.writeMessage(req.session.userid, content, parent_id)
                .then((author_id) => res.status(201).send({id: author_id}))
                .catch((err) => res.status(500).send(err));
            }
        }
    });

    return router;
}
exports.default = init;
