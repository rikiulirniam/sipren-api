const db = require("../utils/db");

class Kelas {
    static all(id_jurusan, id_tingkat) {
        return new Promise((resolve, reject) => {
            let q = "SELECT * FROM kelas";

            if (id_jurusan) q += (q[q.length - 1] == 's' ? ' WHERE' : ' AND') + ` id_jurusan = ${id_jurusan}`;
            if (id_tingkat) q += (q[q.length - 1] == 's' ? ' WHERE' : ' AND') + ` id_tingkat = ${id_tingkat}`

      db.query(q, (err, data) => {
        if (err) reject(err);

                resolve(data);
            })
        })
    }
}

module.exports = Kelas;
