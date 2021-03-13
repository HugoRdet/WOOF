var Datastore = require('nedb');
var Messages = require
db = {};
db.messages = new Datastore();

db.messages.loadDatabase();

let message = {
    writer_id: 'John Smith',
    content: "Free Donald Trump !",
    date: new Date(),
    likes: [{liker_id:"QAnon", date:new Date()},{liker_id:"Donald Trump", date:new Date()}]
};

let message_2 = {
    writer_id: 'John Smith',
    content: "Just    DO IT !",
    date:new Date(),
    likes: [{liker_id:"QAnon", date:new Date()},{liker_id:"Donald Trump", date:new Date()}]
};
db.messages.insert(message);
db.messages.insert(message_2);

/*
db.messages.find({}, (err, docs) => {
    if(err)
        console.log("erreur");
    else{
        console.log(docs);
    }
})

db.messages.find({writer_id: 'John Smith'}, {_id:0, writer_id:1, content:1}, (err, docs) => {
    if(err)
        console.log("erreur");
    else{
        console.log(docs);
    }
})

db.messages.find({writer_id:'John Smith'}, {_id:0}, (err,doc) => {
    console.log(doc);
});
*/
function getDocument(writer, content){
    return new Promise( (resolve, reject) => {
        db.messages.find({writer_id: writer, content: content}, {_id: 1}, (err, data) => {
            if(err) {
                reject();
            } else {
                resolve(data[0]);
            }
        });
    });
}


getDocument('John Smith', 'Free Donald Trump !').then((data) => {console.log((data))});
