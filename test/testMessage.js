const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API message", () => {

    mocha.it(" Non-Envoi d'un message lorsque qu'aucun utilisateur est connécté", (done) => {
        const request = chai.request(app.default).keepOpen();
            const message = {
                content: "Ouin Ouin !"

            };
            
            request
            .put('/api/message/write')
            .send(message)
            
            .then((res) => {
                res.should.have.status(400);
                

                request
                .put('/api/message')
                .send(message)
                
                .then((res) => {
                    res.should.have.status(201);
                    console.log(`Retrieving message author ${res.body.id}`)
                    return Promise.all([
                        request
                        .get(`/api/user/${res.body.pseudo}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, message)
                        }),
                        
                        request
                        .get(`/api/user/4`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                    ])
                })
            
            
        }).then(() => done(), (err) => done(err))

            .finally(() => {
                request.close()
            })
        })
    })