class Users {
  constructor(db) {
    this.db = db;
    const req_create_tab = `
      CREATE TABLE IF NOT EXISTS users(
        login VARCHAR(256) NOT NULL PRIMARY KEY,
        password VARCHAR(256) NOT NULL,
        pseudo VARCHAR(256) UNIQUE NOT NULL);
    `;
    const req_create_tab_follow = `
      CREATE TABLE IF NOT EXISTS follow(
        rowid INTEGER PRIMARY KEY,
        followedPseudo VARCHAR(256) NOT NULL,
        followerPseudo VARCHAR(256) NOT NULL);
    `;
    
    db.exec(req_create_tab, (err) => {
      if(err) {
        throw err;
      }
    });
    db.exec(req_create_tab_follow, (err) => {
      if(err) {
        throw err;
      }
    });
  }

  create(login, password,pseudo) {
    return new Promise((resolve, reject) => {
      
      const req_insert_user=this.db.prepare(
        `INSERT INTO users(login,password,pseudo) VALUES (?,?,?);`
      );
      
      req_insert_user.run([login,password,pseudo],(err) => {
        if(err) {
          reject(err);
        } else {
          resolve(req_insert_user.lastID);
        }
      });
    });
  }


  
  get(userid) {
    return new Promise((resolve, reject) => {
      const req_insert_user=this.db.prepare(`SELECT *
                                        FROM users
                                        WHERE rowid==(?)
                                       `);
      
      req_insert_user.get([userid],(err,row) => {
        if(err) {
          //throw err;
          reject(err);
        } else {
          resolve(row);
        }
      });
      
    });
  }
  
  get_login(userid) {
    return new Promise((resolve, reject) => {
      const req_insert_user=this.db.prepare(`SELECT pseudo
                                        FROM users
                                        WHERE rowid==(?)
                                        `);
      
      req_insert_user.get([userid],(err,row) => {
        if(err) {
          //throw err;
          reject(err);
        } else {
          resolve(row.pseudo);
        }
      });
      
    });
  }
  
  async retrieveFromPseudo(pseudo) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT login FROM users WHERE pseudo=?;
      `);
      req.all([pseudo], (err, rows) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(rows);
        }
      });
    });
  }
  
  async exists(login) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT login FROM users WHERE login=?;
      `);
      req.get([login], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row != undefined);
        }
      });
    });
  }

  login(login, password) {
    return new Promise((resolve, reject) => {
      this.checkpassword(login, password).then((req) => console.log("v??rification en cours"))
      if(err){
        console.log("Login rejet??");
        reject();
      }
      else{
        resolve(req);
      }
    });
  }
  
  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      
      const req = this.db.prepare(`
        SELECT rowid FROM users WHERE login=? AND password=?;
      `);
      
      req.get([login, password], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          if (row!=undefined){
            resolve(row.rowid);
          }else{
            resolve(0);
          }
        }
      });
    });
  }
  logout() {
  }
  
  delete(userid) {
    return new Promise( (resolve, reject) => {
          req = this.db.prepare(
          `DELETE FROM users WHERE rowid = ?;`
          );
      console.log("je suis ")
          req.run([userid], (err) => {
            if(err) {
              console.log('Erreur lors de la suppression');
              reject();
            }
            else {
              console.log("OK supress")
              resolve();
            }
          });
    });
  }

  follow(pseudoFollowed, pseudoFollower){
    
    
    return new Promise((resolve, reject) => {
      const req_insert_follow=this.db.prepare(`INSERT INTO follow(followedPseudo,followerPseudo) VALUES (?,?);`);
      
      if (pseudoFollowed==pseudoFollower){
        reject("a user cannot follow himself");
      }
      
      req_insert_follow.run([pseudoFollowed,pseudoFollower],(err) => {
        if(err) {
          console.log(err)
          reject(err);
        } else {
          console.log('follow ok')
          resolve({"follow" : 'OK'});
        }
      });
    });
  }

  unfollow(pseudoFollowed, pseudoFollower){
    
    return new Promise( (resolve, reject) => {
      const req = this.db.prepare(
      `DELETE FROM follow WHERE followedPseudo = ? AND followerPseudo = ?`
      );
      req.run([pseudoFollowed, pseudoFollower], (err) => {
        if(err) {
          console.log('Erreur lors de la suppression');
          reject();
        }
        else {
          resolve();
        }
      });
    });
  }

  getFollowedUsers(pseudo){
    return new Promise ( (resolve, reject) => {
      
      let req = this.db.prepare(
        `SELECT followedPseudo FROM follow where followerPseudo==?; `
      );
      req.all([pseudo], (err, res) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(res);
        }
      });
    });
  }
  
  getAFollowsB(A,B){
    return new Promise ( (resolve, reject) => {
      
      let req = this.db.prepare(
        `SELECT COUNT (*) AS response FROM follow where followerPseudo==? AND followedPseudo=?; `
      );
      req.get([A,B], (err, res) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(res);
        }
      });
    });
  }
  
  getFollowers(pseudo){
    return new Promise( (resolve, reject) => {
      let req = this.db.prepare(
        `SELECT followerPseudo FROM follow WHERE followedPseudo=?;`
      );
      req.get([pseudo], (err, res) => {
        if(err) 
          reject(err);
        else 
          resolve(res);
      });
    });
  }
  
  getCountFollowers(pseudo){
    return new Promise( (resolve, reject) => {
      let req = this.db.prepare(
        `SELECT COUNT (*) AS FollowersCount FROM follow WHERE followedPseudo=?;`
      );
      req.get([pseudo], (err, res) => {
        if(err) 
          reject(err);
        else 
          resolve(res);
      });
    });
  }
  
  
  getCountFollowedUsers(pseudo){
    return new Promise ( (resolve, reject) => {
      
      let req = this.db.prepare(
        `SELECT COUNT (*) AS FollowsCount FROM follow where followerPseudo==?; `
      );
      req.get([pseudo], (err, res) => {
        if(err) 
          reject(err);
        else 
          resolve(res);
      });
    });
  }
  
  unfollowALL(userPseudo){
    return new Promise( (resolve, reject) => {
      let req = this.db.prepare(
        `DELETE FROM follow WHERE followerPseudo=?;`
      );
      req.run([userPseudo], (err) => {
        if(err)
          reject();
        resolve();
      });
    })
  }
  
  DeleteFollowersALL(userPseudo){
    return new Promise( (resolve, reject) => {
      let req = this.db.prepare(
        `DELETE FROM follow WHERE followedPseudo=?;`
      );
      req.run([userPseudo], (err) => {
        if(err)
          reject();
        resolve();
      });
    })
  }
  
  deleteUser(userId){
    return new Promise( (resolve, reject) => {
      let req = this.db.prepare(
        `DELETE FROM users WHERE rowid=?;`
      );
      req.run([userId], (err) => {
        if(err)
          reject();
        resolve();
      });
    })
  }
}

exports.default = Users;
  
  
