var Datastore = require('nedb');
const Messages = require('../src/entities/messages.js');


let db = new Datastore();
let messages = new Messages.default(db);

messages.open();

let userSample = [
    1,
    2,
    3,
    4
]

let textSample = [
    "Free Donald Trump !",
    "You're right",
    "I'm making a random clever statement here.",
    "They should all be put in jail anyway",
    "+1",
    "Stonks __/-->",
]

// nouveaux messages postés
let m1 = messages.writeMessage(userSample[0], textSample[0]);
messages.db.insert(m1);
let m2 = messages.writeMessage(userSample[1], textSample[2]);
messages.db.insert(m2);
let m3 = messages.writeMessage(userSample[2], textSample[5]);
messages.db.insert(m3);

async function test(){
    data = await messages.getMessagesByAuthor(m1.author_id);
    id = data[0]._id;
    messages.printMessage(data[0]);
    messages.likeMessage(id, userSample[3]);
    messages.commentMessage(id, userSample[2], textSample[3]);
}

test();
