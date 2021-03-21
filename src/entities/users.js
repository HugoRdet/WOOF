class Users {
  constructor(db) {
    this.db = db
    const req_create_tab = `
      CREATE TABLE IF NOT EXISTS users(
        login VARCHAR(256) NOT NULL PRIMARY KEY,
        password VARCHAR(256) NOT NULL,
        pseudo VARCHAR(256) NOT NULL);
    `;
    db.exec(req_create_tab, (err) => {
      if(err) {
        throw err;
      }
    });
  }

  create(login, password,pseudo) {
    return new Promise((resolve, reject) => {
      
      
      const req_insert_user=this.db.prepare(`INSERT INTO users(login,password,pseudo)
                            VALUES (?,?,?);`);
      
      req_insert_user.run([login,password,pseudo],(err) => {
        
        if(err) {
          //throw err;
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
      this.checkpassword(login, password).then((req) => console.log("vérification en cours"))
      if(err){
        console.log("Login rejeté");
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
  
  delete(login, password) {
    return new Promise( (resolve, reject) => {
      checkpassword(login, password).then( 
        (id) => {
          req = this.db.prepare(
          `DELETE FROM users WHERE rowid = ?;`
          );
          req.gt([id], (err) => {
            if(err) {
              console.log('Erreur lors de la suppression');
              reject();
            }
            else {
              resolve();
            }
          });
        });
    });
  }

  getFollowedUsers(userId){
    return new Promise ( (resolve, reject) => {
      let req = this.db.prepare(
        `SELECT rowid FROM users where `
      )
    })
  }
}

exports.default = Users;
  
