const db = require("../utils/db");
const Sequelize = require("sequelize");

const { DataTypes } = Sequelize;

class Users {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        `SELECT "user".id_user, "user".username, "user".nama ,"user".level FROM "user"`;

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static update(id_user, username, nama, hashPassword, level) {
    return new Promise((resolve, reject) => {
      let q =`UPDATE "user" SET username = $1, nama = $2, password = $3, level = $4 WHERE id_user = $5`;

        db.query(
        q,
        [username, nama, hashPassword, level, id_user],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static create(username, nama, hashPassword, level) {
    return new Promise((resolve, reject) => {
      let q = `INSERT INTO "user" (username, nama, password, level) VALUES ($1, $2, $3, $4)`;

      db.query(q, [username, nama, hashPassword, level], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static delete(id_user) {
    return new Promise((resolve, reject) => {
      let q = `DELETE FROM "user" where id_user = $1`;

      db.query(q, [id_user], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static find(username) {
    return new Promise((resolve, reject) => {
      let q = `SELECT * FROM "user" WHERE "username" = $1 `;

      db.query(q, [username], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static findById(id_user) {
    return new Promise((resolve, reject) => {
      let q = `SELECT * FROM "user" WHERE id_user = $1 `;

      db.query(q, [id_user], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static findRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      let q = `SELECT * FROM "user" WHERE "refresh_token" = $1`;

      db.query(q, [refreshToken], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static refreshToken(newRefreshToken, id) {
    return new Promise((resolve, reject) => {
      let q = `UPDATE "user" SET "refresh_token" = $1 WHERE id_user = $2`;

      db.query(q, [newRefreshToken, id], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}

module.exports = Users;
