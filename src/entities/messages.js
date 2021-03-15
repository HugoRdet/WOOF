class Messages {
  constructor(db) {
    this.db = db;
  }
  open() {
    this.db.loadDatabase();
  }

  writeMessage(author, content, parent_id) {
    return {
      parent_id: parent_id,
      author_id: author,
      content: content,
      date: new Date(),
      likes: [],
      comments: [],
    } 
  }

  printMessage(message) {
    console.log('Author : ', message.author_id);
    console.log(message.content);
    console.log("Likes : ", message.likes.length);
    message.comments.forEach((comment) => {
      console.log('Comment : ')
      printMessage(comment)
    });
  }
  


  likeMessage(messageId, userId) {
    let newLike = {user_id: userId, date: new Date()};
    this.db.update({_id: messageId}, {likes: newLike}, {upsert:true}, function(err, numAffected){
      console.log(numAffected, "message liké(s)")
    });
  }
  
  commentMessage(messageId, userId, content) {
    let newComment = this.writeMessage(userId, content, messageId);
    this.db.update({_id: messageId}, {$push : {comments: newComment}},{upsert:true} , function(err, numAffected, affectedDocuments){
      console.log(numAffected, "commentaire ajouté");
    });
  }
  
  getMessagesByAuthor(author) {
    return new Promise( (resolve, reject) => {
      this.db.find({author_id: author}, (err, data) => {
        if(err)
          reject();
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

  getMessageByContent(content) {
    return new Promise( (resolve, reject) => {
      this.db.find({content: new RegExp(content)}, (err, data) => {
        if(err)
          reject();
        resolve(data);
      });
    });
  }
}

exports.default = Messages
