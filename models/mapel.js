const db = require('../utils/db');

class Mapel {
    static detail(produktif = false) {
        return new Promise((resolve, reject) => {
            let q = "SELECT id_mapel,nama_mapel, produktif FROM mapel";

            if (produktif == false) q += " WHERE produktif = 0";
            else if(produktif == true) q += " WHERE produktif = 1";

            db.query(q, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static all() {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT 
            id_mapel,
            nama_mapel, 
            produktif 
        FROM mapel 
        `;

        db.query(q, (err, result) => {
        if (err) return reject(err);
        resolve(result.rows);
        });
    });
    }



    static create(nama_mapel, produktif){
        return new Promise((resolve, reject) => {
            let q = `INSERT INTO mapel (nama_mapel, produktif) VALUES ($1, $2)`;
            db.query(q, [nama_mapel, produktif], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static find(id_mapel){
        return new Promise((resolve, reject) => {
            let q = `SELECT nama_mapel FROM mapel WHERE id_mapel = $1`;
            db.query(q, [id_mapel], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static delete(id_mapel){
        return new Promise((resolve, reject) => {
            let q = `DELETE FROM mapel WHERE id_mapel = $1`;
            db.query(q, [id_mapel], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    
}

module.exports = Mapel;