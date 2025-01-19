const db = require("../utils/db");

class Presensi {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT materi.nama_materi, materi.deskripsi , user.nama, kelas.id_kelas ,  kelas.no_kelas, jurusan.akronim, kelas.tingkat, presensi.jam_started, presensi.jam_ended , presensi.hari_tanggal, presensi.create_date, presensi.update_date FROM presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi INNER JOIN user ON presensi.id_user = user.id_user INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan";

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static create(values) {
    return new Promise((resolve, reject) => {
      let q =
        "INSERT INTO presensi(`id_materi`, `id_user`, `id_kelas`, `jam_started` , `jam_ended` , `hari_tanggal`) VALUES(?)";

      db.query(q, [values], (err, res) => {
        if (err) reject(err);

        if (res && res.insertId) {
          resolve(res.insertId);
        } else {
          reject(new Error("tidak dapat mengembalikan id"));
        }
      });
    });
  }

  static update(
    id_materi,
    id_user,
    id_kelas,
    deskripsi,
    hari_tanggal,
    id_presensi
  ) {
    return new Promise((resolve, reject) => {
      let q =
        "UPDATE presensi SET id_materi = ?, id_user = ?, id_kelas = ?, deskripsi = ?, hari_tanggal = ? WHERE id_presensi = ?";

      db.query(
        q,
        [id_materi, id_user, id_kelas, deskripsi, hari_tanggal, id_presensi],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static delete(id_presensi) {
    return new Promise((resolve, reject) => {
      let q = "DELETE FROM presensi WHERE id_presensi = ?";

      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static findByKelas(id_kelas) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT materi.nama_materi, user.nama, kelas.id_kelas, presensi.hari_tanggal, presensi.create_date, presensi.update_date FROM presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi INNER JOIN user ON presensi.id_user = user.id_user INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas WHERE kelas.id_kelas = ?";

      db.query(q, [id_kelas], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static findByPresensi(id_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT materi.nama_materi, user.nama, kelas.no_kelas, presensi.hari_tanggal, presensi.create_date, presensi.update_date FROM presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi INNER JOIN user ON presensi.id_user = user.id_user INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas WHERE presensi.id_presensi = ?";

      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = Presensi;
