const db = require('../utils/db');

class Mapel {
    static all(produktif = false) {
        return new Promise((resolve, reject) => {
            let q = "SELECT id_mapel,nama_mapel FROM mapel";

            if (produktif == false) q += " WHERE produktif = 0";
            else if(produktif == true) q += " WHERE produktif = 1";

            db.query(q, (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }
}

module.exports = Mapel;