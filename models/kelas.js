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

  static create(values) {
    return new Promise((resolve, reject) => {
      let q =
        "INSERT INTO kelas(`id_jurusan`, `tingkat`, `no_kelas`) VALUES (?)";

      db.query(q, [values], (err, res) => {
        if (err) reject(err);
        // const selectQuery = "SELECT id_kelas FROM kelas WHERE id_kelas = ?";
        // db.query(selectQuery, [data.insertId], (err, data) => {
        //   if (err) return reject(err);

        //   resolve(data); // Data pertama yang ditemukan
        // });
        if (res && res.insertId) {
          resolve(res.insertId);
        } else {
          reject(new Error("tidak dapat mengembalikan id"));
        }
      });
    });
  }

  static update(id_jurusan, tingkat, no_kelas, id_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "UPDATE kelas SET id_jurusan = ?, tingkat=?, no_kelas = ? WHERE id_kelas = ? ";

      db.query(q, [id_jurusan, tingkat, no_kelas, id_kelas], (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }

  static delete(id_kelas) {
    return new Promise((resolve, reject) => {
      let q = "DELETE FROM kelas WHERE id_kelas = ? ";

      db.query(q, [id_kelas], (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }

  static find(id_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT k.id_kelas, j.id_jurusan, j.nama_jurusan, j.akronim, k.tingkat, k.no_kelas FROM kelas k INNER JOIN jurusan j ON k.id_jurusan = j.id_jurusan WHERE k.id_kelas = ?;";
      // let q = "SELECT * FROM kelas where tingkat = '?'";

      // Konversikan no_kelas menjadi angka (integer) jika perlu
      db.query(q, [id_kelas], (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static getIdKelas(tingkat, id_jurusan, no_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT k.id_kelas from kelas k INNER JOIN jurusan j ON k.id_jurusan = j.id_jurusan WHERE k.tingkat = ? AND k.id_jurusan = ? AND k.no_kelas = ?";

      db.query(q, [tingkat, id_jurusan, no_kelas], (err, data) => {
        if (err) return reject(err);
        resolve(data[0].id_kelas);
      });
    });
  }
}

module.exports = Kelas;
