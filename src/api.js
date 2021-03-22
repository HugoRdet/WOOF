const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");

function init(usersDB, messagesDB) {
    
    const router = express.Router();
    router.use(express.json());
    router.use((req, res, next) => {
        
        /*
        !
        !
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
            
            
            let userid = await users.checkpassword(login, password);
            
            
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
                        
                        users.get_login(userid).then((pseudo) => {
                            req.session.pseudo=pseudo;
                            
                            res.status(200).json({
                                status: 200,
                                message: "Login et mot de passe accepté"
                            });
                            
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


    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            console.log("userid: ",req.session.userid);
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
    
        router.put("/user/follow", (req, res) => {
            
            if(req.session.userid == undefined) {
                /*Dans le cas ou aucun utilisateur n'est connecté:*/
                res.status(400).send("a ghost can't follow");
            }else{
                
                const { pseudo } = req.body;
                if ( !pseudo ) {
                    res.status(400).send("Missing fields");
                } else {
                    users.follow(pseudo,req.session.pseudo)
                    .then((doc) => res.status(201).send(doc))
                    .catch((err) => res.status(500).send(err));
                }
            }
        });
        
        router.put("/user/unfollow", (req, res) => {
            
            if(req.session.userid == undefined) {
                /*Dans le cas ou aucun utilisateur n'est connecté:*/
                res.status(400).send("a ghost can't unfollow");
            }else{
                
                const { pseudo } = req.body;
                if ( !pseudo ) {
                    res.status(400).send("Missing fields");
                } else {
                    users.unfollow(pseudo,req.session.pseudo)
                    .then(() => res.status(201).send({response:" unfollowed OK "}))
                    .catch((err) => res.status(500).send(err));
                }
            }
        });
        
        router.get("/user/display/follow", (req, res) => {
            
            const { pseudo } = req.body;
            if ( !pseudo ) {
                res.status(400).send("Missing fields");
            } else {
                users.getFollowedUsers(pseudo).then((doc) => {            
                    if (!doc)
                        res.sendStatus(404);
                    else
                        res.status(201).send(doc);
                    
                });
                
            }
            
        });
    
    router
        .route("/user/display/:pseudo")
        .get(async (req, res) => {
        try {
            message.getMessagesByAuthor(req.params.pseudo).then((doc) => {            
                if (!doc)
                    res.sendStatus(404);
                else
                    res.status(201).send(doc);
            
            });
        }
        catch (e) {
            res.status(500).send(e);
        }
    });
    
        router.put("/user/logout", (req, res) => {
            if(req.session.userid == undefined) {
                /*Dans le cas ou aucun utilisateur n'est connecté:*/
                res.status(400).send("a ghost can't log out");
            }else{
                //un utilisateur est connecté
                req.session.destroy((err) => { });
                res.send({response: "logout successfull"})
    
                
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
                message.writeMessage(req.session.userpseudo, content, parent_id)
                // ???????
                .then((author_id) => res.status(201).send({id: author_id}))
                .catch((err) => res.status(500).send(err));
            }
        }
    });

    router.get("/user/display/newsfeed", (req, res) => {
        users.getFollowedUsers(req.session.userpseudo).then((doc) => {            
            if (!doc)
                res.sendStatus(404);
            else{
                console.log("jusqu'ici tout va bien ...");
                let n = 2;
                let m = 0;
                let followedPseudoList = doc.map(({followedPseudo}) => followedPseudo);
                message.getMessagesFromFollowed(followedPseudoList, n, m).then(
                    (data) => {
                        if(!data)
                            res.sendStatus(404);
                        else
                            res.status(201).send(data);
                    }
                );
            }
        });
        }
    );

    router
        .route("/message/search/:content")
        .get(async (req, res) => {
        try {
            console.log(req.params.content)
            message.getMessagesByContent(req.params.content).then((doc) => {            
                if (!doc)
                    res.sendStatus(404);
                else
                    res.status(201).send(doc);
            
            });
        }
        catch (e) {
            res.status(500).send(e);
        }
    });

    router.put("/message/like", (req, res) => {
        
        if(req.session.userid == undefined) {
            /*Dans le cas ou aucun utilisateur n'est connecté:*/
            res.status(400).send("a ghost can't like");
        }else{
            //un utilisateur est connecté
            const { messageId } = req.body;
            if (!messageId) {
                res.status(400).send("Message not found");
            } else {
                message.likeMessage(messageId, req.session.userid);
                res.status(201).send({"like" : 1});
            }
        }
    });

    router.put("/message/unlike", (req, res) => {
        
        if(req.session.userid == undefined) {
            /*Dans le cas ou aucun utilisateur n'est connecté:*/
            res.status(400).send("a ghost can't unlike");
        }else{
            //un utilisateur est connecté
            const { messageId } = req.body;
            if (!messageId) {
                res.status(400).send("Message not found");
            } else {
            message.unlikeMessage(messageId, req.session.userid);
            res.status(201).send({"unlike" : 1});
            }
        }
    });

    return router;
}
exports.default = init;
    
