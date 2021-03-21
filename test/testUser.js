const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API user", () => {
    mocha.it("Création d'un utilisateur", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            login: "pikachu",
            password: "1234",
            pseudo:"Sarsd"
        };
        
        request
            .put('/api/user/create')
            .send(user)

            .then((res) => {
                res.should.have.status(201);
                        
                return Promise.all([
                    
                    request
                        .get(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, user)
                        }),

                    request
                        .get(`/api/user/4`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    });
    
    mocha.it("Non-Création d'un utilisateur déjà existant", (done) => {
        const request = chai.request(app.default).keepOpen();
            const user = {
                login: "pikachu",
                password: "1234",
                pseudo:"Sarsd"
            };
                
            request
            .put('/api/user/create')
            .send(user)
                
            .then((res) => {
                res.should.have.status(500);

            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
        });
    
    console.log("\n")
    
    mocha.it("Login d'un user existant dans la bd", (done) => {
        const request = chai.request(app.default).keepOpen();
            const user = {
                login: "pikachu",
                password: "1234",
            };
                
            request
            .post('/api/user/login')
            .send(user)
                
            .then((res) => {
                res.should.have.status(500);
                    
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
        });
        
    mocha.it("Login avec des identifiants incorrects", (done) => {
        const request = chai.request(app.default).keepOpen();
            const user = {
                login: "pikachu",
                password: "mauvais_mdp",
            };
                
            request
            .post('/api/user/login')
            .send(user)
                
            .then((res) => {
                res.should.have.status(403);
                    
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
        });
    
    mocha.it("Login avec des identifiants incorrects", (done) => {
        const request = chai.request(app.default).keepOpen();
            const user = {
                login: "pikachu",
                password: "mauvais_mdp",
            };
                
                request
                .post('/api/user/login')
                .send(user)
                
                .then((res) => {
                    res.should.have.status(403);
                    
                }).then(() => done(), (err) => done(err))
                .finally(() => {
                    request.close()
                })
            });
    
})

