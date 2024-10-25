const db = require("../utils/db");

class Kelas {
  static all(id_jurusan, id_tingkat) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT kelas.*, jurusan.nama_jurusan, tingkat.nama_tingkat FROM kelas JOIN jurusan ON kelas.id_jurusan = jurusan.id JOIN tingkat ON kelas.tingkat = tingkat.id";

      if (id_jurusan)
        q +=
          (q[q.length - 1] == "s" ? " WHERE" : " AND") +
          ` id_jurusan = ${id_jurusan}`;
      if (id_tingkat)
        q +=
          (q[q.length - 1] == "s" ? " WHERE" : " AND") +
          ` id_tingkat = ${id_tingkat}`;

      db.query(q, (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }
}

module.exports = Kelas;
