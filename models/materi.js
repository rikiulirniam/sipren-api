const db = require('../utils/db');

class Materi {


    static create( nama_materi, deskripsi) {
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO materi (nama_materi, deskripsi) VALUES ($1, $2) RETURNING *";
    
            db.query(q, [nama_materi, deskripsi], (err, data) => {
                if (err) reject(err);
                if (data) {
                    resolve(data.rows[0].id_materi);
                }
            });
        });
    }

    static update(materi, deskripsi_materi, id_materi){
        return new Promise((resolve, reject) => {
            let q = `UPDATE materi SET nama_materi = $1, deskripsi = $2 WHERE id_materi = $3`

            db.query(q, [materi, deskripsi_materi, id_materi], (err, res) => {
                if(err) reject(err)
                resolve(res)
            })
        })
    }
}

module.exports = Materi;