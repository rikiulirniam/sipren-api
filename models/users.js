const db = require("../utils/db");
const Sequelize = require("sequelize");

const { DataTypes } = Sequelize;

class Users {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT user.id_user, user.username, user.level, user.create_date, user.update_date FROM user";

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  
  static update(id_user, username, hashPassword, level){
    return new Promise((resolve, reject) => {
      let q = "UPDATE user SET username = ?, password = ?, level = ? WHERE id_user = ?";

      db.query(q, [username, hashPassword, level, id_user], (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
  }

  static create(values) {
    return new Promise((resolve, reject) => {
      let q = "INSERT INTO user(username, password, level) VALUES (?)";

      db.query(q, [values], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static delete(id_user){
    return new Promise((resolve, reject) => {
      let q = "DELETE FROM user where id_user = ?";

      db.query(q, [id_user], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    })
  }
  
  static find(username) {
    return new Promise((resolve, reject) => {
      let q = "SELECT * FROM user WHERE username = ? ";

      db.query(q, [username], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static findById(id_user) {
    return new Promise((resolve, reject) => {
      let q = "SELECT * FROM user WHERE id_user = ? ";

      db.query(q, [id_user], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static findRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      let q = "SELECT * FROM user WHERE refresh_token = ?";

      db.query(q, [refreshToken], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static refreshToken(newRefreshToken, id) {
    return new Promise((resolve, reject) => {
      let q = "UPDATE user SET refresh_token = ? WHERE id_user = ?";

      db.query(q, [newRefreshToken, id], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

}

module.exports = Users;