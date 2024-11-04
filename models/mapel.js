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

    static all(){
        return new Promise((resolve, reject) => {
            let q = "SELECT m.id_mapel, t.tingkat, m.nama_mapel, produktif FROM mapel m INNER JOIN tingkat t";

            db.query(q, (err, data) => {
                if(err) reject(err);
                resolve(data);
            })
        })
    }

    static getIdMapel(nama_mapel){
        return new Promise((resolve, reject) => {
            let q = "SELECT id_mapel FROM mapel WHERE nama_mapel = ?";

            db.query(q, [nama_mapel], (err, data) => {
                if(err) reject(err);
                resolve(data[0].id_mapel);
            })
        })
    }

    
}

module.exports = Mapel;