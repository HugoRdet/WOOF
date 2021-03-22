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
        comments: [],
      } 
      if(parent_id == -1)
        this.db.insert(message, function(){});
      else{
        this.db.update({_id: parent_id}, {$push : {comments: newComment}},{} , function(err, numAffected, affectedDocuments){
          console.log(numAffected, "commentaire ajouté");
        });
      }
      resolve(author);
    });
  }


  likeMessage(messageId, userId) {
    let newLike = {user_id: userId, date: new Date()};
    this.db.update({_id: messageId}, {likes: newLike}, {upsert:true}, function(err, numAffected){
      console.log(numAffected, "message liké(s)")
    });
  }
  
  getMessagesByAuthor(author) {
    return new Promise( (resolve, reject) => {
      this.db.find({author_id: author}, (err, data) => {
        if(err){
          reject(err);
        }
        resolve(data);
      });
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

  getMessagesByContent(content) {
    return new Promise( (resolve, reject) => {
      this.db.find({content: new RegExp(content)}, (err, data) => {
        if(err)
          reject();
        resolve(data);
      });
    });
  }
  
  getParentMessageFromComment(messageId, parentId) {
    if (parentId == -1){
      return;
    }
    let parentMessage = getMessageById(parentId).then(
      this.db.update({_id: messageId}, {parent_message: parentMessage}, {upsert:true}, function(err, numAffected){
        console.log(numAffected, "message commenté ajouté");
      })
    );
  }
  
  getMessagesFromFollowed(followedPseudoList, loadNumber, loadMultiplier) {
    return new Promise ( (resolve, reject) => {
      this.db.find({ author_id : { $in: followedPseudoList }})
      .sort({ date: -1 } // modifiable
        .skip(loadNumber*loadMultiplier)
        .limit(loadNumber)
        .exec(function (err, data){
          if (err)
            reject();
          resolve(data);
        }));
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
  
}

exports.default = Messages
