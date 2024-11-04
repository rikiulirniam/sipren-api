const db = require('../utils/db');

class Materi {
    static show(id_materi) {
        return new Promise((resolve, reject) => {
            let q = "SELECT id_materi, nama_materi, deskripsi FROM materi WHERE id_materi = ?";

            db.query(q, [id_materi], (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static create(value) {
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO materi (`id_mapel`, `nama_materi`, `deskripsi`) VALUES (?)";
    
            db.query(q, [value], (err, data) => {
                if (err) return reject(err);
    
                // Log hasil dari query untuk debugging
                // console.log("Hasil dari query INSERT:", data);
    
                // Memastikan data tidak undefined
                if (data && data.insertId) {
                    resolve(data.insertId);
                } else {
                    reject(new Error("insertId tidak ditemukan dalam hasil query"));
                }
            });
        });
    }
}

module.exports = Materi;