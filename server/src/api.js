const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");

function init(usersDB, messagesDB) {
    
    const router = express.Router();
    router.use(express.json());
    router.use((req, res, next) => {
        
        next();
    });

    const users = new Users.default(usersDB);
    const message = new Messages.default(messagesDB);
    message.open();

    router.post("/user/login", async (req, res) => {
    
        try {
            
            const { login, password } = req.body;
            if (!login || !password) {
                console.log("Requête invalide , login et password nécessaires")
                res.status(201).send({
                    status: 400,
                    message: "login et password nécessaires"
                });
                return;
            }
            
            if(! await users.exists(login)) {
                console.log("Utilisateur inconnu")
                res.status(201).send({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            
            
            let userid = await users.checkpassword(login, password);
            
            if (userid) {
                req.session.regenerate(function (err) {
                    if (err) {
                        console.log("Erreur interne")
                        res.status(201).send({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        req.session.userid = userid;
                        users.get_login(userid).then((pseudo) => {
                            req.session.userpseudo=pseudo;
                            
                            res.status(200).send({
                                status: 200,
                                message: "Login et mot de passe accepté",
                                pseudo: pseudo 
                            });
                            
                        });
                    }
                });
                return;
            }
            console.log("login et/ou le mot de passe invalide(s)")
            req.session.destroy((err) => { });
            res.status(201).send({
                status: 403,
                message: "login et/ou mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            console.log("erreur interne")
            res.status(201).send({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

        router
        .route("/user/search/:pseudo")
        .get(async (req, res) => {
            const {pseudo} = req.params
            try {

                const logins = await users.retrieveFromPseudo(pseudo)
                console.log(logins)
                if (!logins)
                    res.sendStatus(404);
                else {
                    res.send(logins)
                }
            }
            catch(e) {
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (e || "Erreur inconnue").toString()
                });
            }
        })
        
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

    
        
    router.put("/user/create", (req, res) => {
        
        
        const { login, password, pseudo } = req.body;
        if (!login || !password || !pseudo) {
            console.log("erreur interne");
            res.status(200).send({
                status: 400,
                message: "Champs manquants",
            });
        } else {
            
            
            if (pseudo=="" || pseudo.length>=32){
                res.status(200).send({
                status: 400,
                message: "Entrez un pseudo de moins de 32 caractères",
                });
            }else{
                if (password.length<8){
                    res.status(200).send({
                    status: 400,
                    message: "Entrez un mot de passe d'au moins 8 caractères",
                });

                }else{
                    
                    users.create(login, password, pseudo)
                    .then((user_id) => res.status(201).send({status:201, id: user_id ,message:"utilisateur créé"}))
                    .catch((err) => res.status(200).send({status: 500 ,message :"Login déjà utilisé"}));
                
                }
            }
            
            
            
            
            
        }
    });
        
    router.put("/user/delete", (req, res) => {
        if (req.session.userid==undefined) {
            res.status(400).send("A ghost is already invisible");
        } else {
            users.deleteUser(req.session.userid)
            const promise1 =users.unfollowALL(req.session.userpseudo);
            const promise2 =users.DeleteFollowersALL(req.session.userpseudo);
            const promise3 =message.deleteAllMessagesByAuthor(req.session.userpseudo);
            Promise.all([promise1, promise2, promise3]).then((values) => {
                 res.status(201).send({ confirmation : 1})
            }).catch((err) => res.status(500).send(err));
        
                
            
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
                    
                    users.getAFollowsB(req.session.userpseudo,pseudo).then( (resp) => {
                        if (resp.response==0){
                            users.follow(pseudo,req.session.userpseudo)
                            .then((doc) => res.status(201).send(doc))
                            .catch((err) => res.status(500).send(err));
                        }else{
                            res.status(201).send({confirm: "OK"});
                        }
                    } )
                    
                    
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
                    console.log("unfollow done.")
                    users.unfollow(pseudo,req.session.userpseudo)
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
        .route("/message/display/comments/:id&:loadNumber&:loadMultiplier")
        .get(async (req, res) => {
          const { id , loadNumber , loadMultiplier } = req.params
        try {
            message.getMessagesByParentId( id , loadNumber , loadMultiplier ).then((doc) => {            
                if (!doc){
                    res.sendStatus(404);
                }
                else{
                    res.status(201).send(doc);
                }
            });
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e);
        }
        });

    router
        .route("/user/display/profile/:pseudo&:loadNumber&:loadMultiplier")
        .get(async (req, res) => {
        try {
            message.getMessagesByAuthor(req.params.pseudo, req.params.loadNumber, req.params.loadMultiplier).then((doc) => {            
                if (!doc)
                    res.sendStatus(404);
                else{
                    res.status(201).send(doc);
                }
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
                res.status(400).send("Vous conviendrez q'un message sans contenu n'a pas beaucoup d'interêt");
            } else {
                message.writeMessage(req.session.userpseudo, content, parent_id)
                
                .then((author_pseudo) => 
                    {
                        res.status(201).send({pseudo: author_pseudo})
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    })
            }
        }
    });

        router.get("/user/display/newsfeed/:loadNumber&:loadMultiplier", (req, res) => {
        const {number, multiplier} = req.params;  
        users.getFollowedUsers(req.session.userpseudo).then((doc) => {            
            if (!doc)
                res.sendStatus(404);
            else{
                doc.push({'followedPseudo' : req.session.userpseudo});
                let followedPseudoList = doc.map((followedPseudo) => followedPseudo.followedPseudo);
                message.getMessagesFromFollowed(followedPseudoList, number, multiplier).then(
                    (data) => {
                        if(!data)
                            res.sendStatus(404);
                        else{
                            console.log(data)
                            res.status(201).send(data);
                        }
                    }
                );
            }
        });
        }
    );

        router
        .route("/message/search/:content&:loadNumber&:loadMultiplier")
        .get(async (req, res) => {
        const {content, number, multiplier} = req.params
        try {
            message.getMessagesByContent(content, number, multiplier).then((doc) => {            
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
            res.status(201).send({"unlike" : 0});
            }
        }
    });
        
        
        router.get("/message/getlike/:message_id", (req, res) => {
                
            const  messageId = req.params.message_id;

            if (!messageId) {
                res.status(400).send("Message not found");
            } else {
                message.getLikeMessage(messageId,req.session.userid).then((data) => {
                    if (data==undefined){
                        res.status(400).send("Non trouvé BD");
                    }else{
                        res.status(201).send({likestatus:data});
                    }
                        
                            
                    }
                );
            }
        }
    );
    
    router
        .route("/user/display/getfollow/:pseudo")
        .get(async (req, res) => {
        try {
            
            users.getAFollowsB(req.session.userpseudo,req.params.pseudo).then((count) => {  
                if (count==undefined)
                    res.sendStatus(404);
                else
                    console.log("count ", req.params.pseudo)
                    res.status(201).send(count);
            });
        }
        catch (e) {
            res.status(500).send(e);
        }
    });

    router
        .route("/user/display/count/followers/:pseudo")
        .get(async (req, res) => {
        try {
            
            users.getCountFollowers(req.params.pseudo).then((count) => {  
                if (count==undefined)
                    res.sendStatus(404);
                else
                    console.log("count ", req.params.pseudo)
                    res.status(201).send(count);
            
            });
        }
        catch (e) {
            res.status(500).send(e);
        }
    });
    
        
        router
        .route("/user/display/count/follows/:pseudo")
        .get(async (req, res) => {
            try {
                
                users.getCountFollowedUsers(req.params.pseudo).then((count) => {  
                    
                    if (count==undefined)
                        res.sendStatus(404);
                    else
                        res.status(201).send(count);
                    
                });
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
    
    router
        .route("/user/display/count/messages/:pseudo")
        .get(async (req, res) => {
        try {
            message.getCountMessagesByAuthor(req.params.pseudo).then((count) => {  
                if (count==undefined)
                    res.sendStatus(404);
                else
                    res.status(201).send({nb_tweets:count});
            });
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
    
        
    
        router
        .route("/user/display/followers/:pseudo")
        .get(async (req, res) => {
            try {
                
                users.getFollowers(req.params.pseudo).then((followers_) => {  
                    
                    if (!followers_)
                        res.sendStatus(404);
                    else
                        res.status(201).send(followers_);
                    
                });
            }
            catch (e) {
                res.status(500).send(e);
            }
        });


        router
        .route("/message/delete/:messageid")
        .get(async (req, res) => {
            try {
                message.getMessageById(req.params.messageid).then(
                    (msg) => {
                        if ((msg==[])||(message==undefined)){
                            res.status(200).send({message_delete:0});                            
                        }else{
                            if(msg[0].author_id != req.session.userpseudo){
                                res.sendStatus(401).send({message_delete:0});
                            }else {
                                message.deleteMessage(req.params.messageid)
                                res.status(200).send({message_delete:msg});
                            }
                        }
                    }
                ).catch((err) => res.status(500).send({message_delete:0}));
        }
        catch (e) {
            res.status(500).send(e);
        }
    });
    
    router
    .route("/message/delete_all")
    .put(async (req, res) => {
        
        try {
            if (req.session.userpseudo!=undefined){
                message.deleteAllMessagesByAuthor(req.session.userpseudo);
                res.status(201).send({"messages deleted from user" : req.session.userpseudo });
            }else{
                res.status(400).send("A ghost can't delete his messages");
            }
        }
        catch (e) {
            res.status(500).send(e);
        }
    });
    
    
    return router;
}
exports.default = init;
    
