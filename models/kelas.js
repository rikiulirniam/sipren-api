const db = require("../utils/db");

class Kelas {
  static all(id_jurusan, tingkat, no_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT k.id_kelas, j.nama_jurusan, j.akronim, k.tingkat, k.no_kelas FROM kelas k INNER JOIN jurusan j ON k.id_jurusan = j.id_jurusan";

      if (id_jurusan)
        q +=
          (q[q.length - 1] == "n" ? " WHERE" : " AND") +
          ` k.id_jurusan = ${id_jurusan}`;
      if (tingkat)
        q +=
          (q[q.length - 1] == "n" ? " WHERE" : " AND") +
          ` k.tingkat = '${tingkat}'`;

      if (no_kelas)
        q +=
          (q[q.length - 1] == "n" ? " WHERE" : " AND") +
          ` k.no_kelas = '${no_kelas}'`;

      db.query(q, (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }

  static create(id_jurusan, tingkat, no_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        `INSERT INTO kelas(id_jurusan, tingkat, no_kelas) VALUES ($1, $2, $3) RETURNING *`;

      db.query(q, [id_jurusan, tingkat, no_kelas], (err, data) => {
        if (err) reject(err);
        resolve(data.rows[0]); 
      });
    });
  }

  static update(id_jurusan, tingkat, no_kelas, id_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "UPDATE kelas SET id_jurusan = $1, tingkat=$2, no_kelas = $3 WHERE id_kelas = $4 ";

      db.query(q, [id_jurusan, tingkat, no_kelas, id_kelas], (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }

  static delete(id_kelas) {
    return new Promise((resolve, reject) => {
      let q = "DELETE FROM kelas WHERE id_kelas = $1 ";

      db.query(q, [id_kelas], (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }

  static find(id_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT k.id_kelas, j.id_jurusan, j.nama_jurusan, j.akronim, k.tingkat, k.no_kelas FROM kelas k INNER JOIN jurusan j ON k.id_jurusan = j.id_jurusan WHERE k.id_kelas = $1";

      db.query(q, [id_kelas], (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static getIdKelas(tingkat, id_jurusan, no_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT id_kelas FROM kelas WHERE tingkat = $1 AND id_jurusan = $2 AND no_kelas = $3";

      db.query(q, [tingkat, id_jurusan, no_kelas], (err, data) => {
        if (err) return reject(err);
        resolve(data.rows);
      });
    });
  }
}

module.exports = Kelas;
