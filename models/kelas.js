const db = require('../utils/db');

class Kelas {
    static all(id_jurusan, tingkat) {
        return new Promise((resolve, reject) => {
            let q = "SELECT k.id_kelas, j.nama_jurusan, k.tingkat, k.no_kelas FROM kelas k INNER JOIN jurusan j ON k.id_jurusan = j.id_jurusan";

            if (id_jurusan) q += (q[q.length - 1] == 'n' ? ' WHERE' : ' AND') + ` k.id_jurusan = ${id_jurusan}`;
            if (tingkat) q += (q[q.length - 1] == 'n' ? ' WHERE' : ' AND') + ` k.tingkat = '${tingkat}'`

            db.query(q, (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }

    static create(values){
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO kelas(`id_jurusan`, `tingkat`, `no_kelas`) VALUES (?)";

            db.query(q, [values], (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }

    static update(id_jurusan, tingkat, no_kelas, id_kelas){
        return new Promise((resolve, reject) => {
            let q = "UPDATE kelas SET id_jurusan = ?, tingkat=?, no_kelas = ? WHERE id_kelas = ? ";

            db.query(q, [id_jurusan, tingkat, no_kelas, id_kelas], (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }

    static delete(id_kelas){
        return new Promise((resolve, reject) => {
            let q = "DELETE FROM kelas WHERE id_kelas = ? ";

            db.query(q, [id_kelas], (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }
}

module.exports = Kelas;