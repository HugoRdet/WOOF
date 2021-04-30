class Messages {
  constructor(db) {
    this.db = db;
  }
  open() {
    this.db.loadDatabase();
  }

    writeMessage(author, content, parent_id) {
    return new Promise ((resolve, reject) => {
      let message = {
        parent_id: parent_id,
        author_id: author,
        content: content,
        date: new Date(),
        likes: [],
      } 
      this.db.insert(message)
      resolve(author);

    });
  }

    
  
    
    likeMessage(messageId, userId) {
    let newLike = {user_id: userId, date: new Date()};
    this.db.update({_id: messageId}, {$push : { likes: newLike}}, {}, function(err, numAffected){
      console.log(numAffected);
    });
  }

    getLikeMessage(messageId, userId) {
    return new Promise( (resolve, reject) => {
      this.db.count({$and: [{_id: messageId},{likes: { $elemMatch: {user_id: userId}}}]}, (err, data) => {
        if(err)
          reject();
        resolve(data);
      });
    });
  }


  unlikeMessage(messageId, userId) {
    this.db.update({_id: messageId}, {$pull : { likes: {user_id: userId}} }, {}, function(err, numAffected){
      console.log(numAffected);
    });
  }
  
  getMessagesByParentId(parentId, loadNumber, loadMultiplier) {
    let loadNumber_ = parseInt(loadNumber)
    let loadMultiplier_ = parseInt(loadMultiplier)
    return new Promise ( (resolve, reject) => {
      this.db.find({ parent_id : parentId})
      .sort({ date: -1 })
        .skip(loadNumber_ * loadMultiplier_)
        .limit(loadNumber_)
        .exec((err, data) => {
          if (err)
            reject();
          resolve(data);
        })
      });
  }
 
  getMessagesByAuthor(author, loadNumber, loadMultiplier) {
    let loadNumber_ = parseInt(loadNumber)
    let loadMultiplier_ = parseInt(loadMultiplier)
    return new Promise ( (resolve, reject) => {
      this.db.find({ author_id : author})
      .sort({ date: -1 })
        .skip(loadNumber_ * loadMultiplier_)
        .limit(loadNumber_)
        .exec((err, data) => {
          if (err)
            reject();
          resolve(data);
        })
      });
  }
  
  getMessagesByDate(hours) {
    return new Promise( (resolve, reject) => {
      this.db.find({date: {$gt: new Date(Date.now() - 3600*1000*hours)}}, (err, data) => {
        if(err)
          reject();
        resolve(data);
      });
    });
  }


  getMessagesByContent(content, loadNumber, loadMultiplier ) {
    let loadNumber_ = parseInt(loadNumber)
    let loadMultiplier_ = parseInt(loadMultiplier)
  return new Promise ( (resolve, reject) => {
    this.db.find({content: new RegExp(content)})
    .sort({ date: -1 })
      .skip(loadNumber_ * loadMultiplier_)
      .limit(loadNumber_)
      .exec((err, data) => {
        if (err)
          reject();
        resolve(data);
      })
    });
  }
  
  
    getMessagesFromFollowed(followedPseudoList, loadNumber, loadMultiplier) {
    let loadNumber_ = parseInt(loadNumber)
    let loadMultiplier_ = parseInt(loadMultiplier)
    return new Promise ( (resolve, reject) => {
      this.db.find({ author_id : { $in: followedPseudoList }})
        .sort({ date: -1 } )
        .skip(loadNumber_*loadMultiplier_)
        .limit(loadNumber_)
        .exec(function (err, data){
          if (err)
            reject();
          resolve(data);
        })
    });
  }
  
  getCountMessagesByAuthor(author){
    return new Promise( (resolve, reject) => {
      this.db.count({author_id: author}, (err, data) => {
        if(err)
          reject();
        
        resolve(data);
      });
    });
  }
  
  
  getMessageById(messageId) {
    return new Promise( (resolve, reject) => {
      this.db.find({_id: messageId}, (err, data) => {
        if(err)
          reject();
        resolve(data);
      });
    });
  }

  deleteMessage(messageId) {
    this.db.remove({_id: messageId}, {multi: true}, (err, numRemoved) => {
      console.log(numRemoved, "message(s) supprimé(s).");
      return numRemoved;
    });
  }
  
  deleteAllMessagesByAuthor(author) {
    console.log("oui") ;
    this.db.remove({ author_id : author }, { multi: true }, (err, numRemoved) => {
      console.log("Messages supprimés:",numRemoved);
      return numRemoved;
    });
  }
}

exports.default = Messages

