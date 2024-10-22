const db = require("../utils/db")
const Sequelize = require("sequelize")

const { DataTypes } = Sequelize;

class Users{
    static all(){
        return new Promise((resolve, reject)=> {
            let q = "SELECT user.id_user, user.username, user.level, guru.nama_guru, user.create_date, user.update_date FROM user INNER JOIN guru ON guru.id_guru = user.id_guru"

            db.query(q, (err, res)=> {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static find(username){
        return new Promise((resolve, reject) => {
            let q = "SELECT * FROM user WHERE username = ?";

            db.query(q, [username], (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }

    static findRefreshToken(refreshToken){
        return new Promise((resolve, reject) => {
            let q = "SELECT * FROM user WHERE refresh_token = ?";

            db.query(q, [refreshToken], (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }

    static refreshToken(newRefreshToken, id){
        return new Promise((resolve, reject) => {
            let q = "UPDATE user SET refresh_token = ? WHERE id_user = ?";

            db.query(q, [newRefreshToken, id], (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }

    static create(values){
        return new Promise((resolve, reject)=>{
            let q = "INSERT INTO user(`username`, `password`, `level`) VALUES (?)";

            db.query(q, [values], (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }
}

module.exports = Users;