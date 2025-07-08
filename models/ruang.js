const db = require("../utils/db");

class Ruang{
    static all(){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM ruang`;
            db.query(q, [], (err, res) => {
                if(err) return reject(err);
                else resolve(res.rows);
            })
        })
    }

    static create(nama_ruang){
        return new Promise((resolve, reject) => {
            let q= `INSERT INTO ruang (nama_ruang)VALUES ($1) RETURNING *`;
            db.query(q, [nama_ruang], (err, res) => {
                if(err) return reject(err);
                else resolve(res.rows[0].nama_ruang);
            })
        })
    }

    static find(nama_ruang){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM ruang WHERE nama_ruang = $1`;
            db.query(q, [nama_ruang], (err, res) => {
                if(err) return reject(err);
                else resolve(res.rows);
            })
        })
    }
    static findById(id_ruang){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM ruang WHERE id_ruang = $1`;
            db.query(q, [id_ruang], (err, res) => {
                if(err) return reject(err);
                else resolve(res.rows);
            })
        })
    }

    static delete(id_ruang){
        return new Promise((resolve, reject) => {
            let q = `DELETE FROM ruang WHERE id_ruang = $1 RETURNING *`;
            db.query(q, [id_ruang], (err, res) => {
                if(err) return reject(err);
                else resolve(res.rows[0].nama_ruang);
            })
        })
    }
}

module.exports = Ruang