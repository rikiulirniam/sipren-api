const db = require("../utils/db");

class Presensi {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        `SELECT materi.nama_materi,
         materi.deskripsi,
        "user".nama,
        "user".username,
         kelas.id_kelas ,
         kelas.no_kelas,
          jurusan.akronim,
          kelas.tingkat,
          presensi.id_presensi,
          presensi.jam_started,
          presensi.jam_ended ,
          presensi.created_at
          FROM presensi 
          INNER JOIN materi 
          ON presensi.id_materi = materi.id_materi 
          INNER JOIN "user" 
          ON presensi.id_user = "user".id_user 
          INNER JOIN kelas 
          ON presensi.id_kelas = kelas.id_kelas 
          INNER JOIN jurusan 
          ON kelas.id_jurusan = jurusan.id_jurusan`;

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
      });
    });
  }

  static create(id_mapel, id_materi, id_user, id_kelas, jam_started , jam_ended , created_at) {
    return new Promise((resolve, reject) => {
      let q =
        `INSERT INTO presensi(id_mapel, id_materi, id_user, id_kelas, jam_started , jam_ended , created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

      db.query(q, [id_mapel, id_materi, id_user, id_kelas, jam_started , jam_ended , created_at], (err, res) => {
        if (err) reject(err);

        if (res && res.rows[0].id_user) {
          resolve(res.rows[0].id_presensi);
        } else {
          reject(new Error("tidak dapat mengembalikan id"));
        }
      });
    });
  }

  static update(id_mapel, jam_started, jam_ended, id_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        "UPDATE presensi SET id_mapel = $1, jam_started = $2, jam_ended = $3 WHERE id_presensi = $4";

      db.query(
        q,
        [id_mapel, jam_started, jam_ended, id_presensi],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static delete(id_presensi) {
    return new Promise((resolve, reject) => {
      let q = "DELETE FROM presensi WHERE id_presensi = $1";

      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

    static findByKelas(id_kelas) {
      return new Promise((resolve, reject) => {
        let q =
          `SELECT 
          mapel.nama_mapel AS mapel,
          materi.nama_materi,
          materi.deskripsi,
          "user".nama AS nama_guru,
          "user".username AS kode_guru,
          kelas.id_kelas,
          kelas.tingkat,
          jurusan.akronim,
          kelas.no_kelas,
          presensi.created_at 
          FROM presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi 
          INNER JOIN "user" ON presensi.id_user = "user".id_user 
          INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas 
          INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan
          INNER JOIN mapel ON presensi.id_mapel = mapel.id_mapel 
          WHERE kelas.id_kelas = $1`;

        db.query(q, [id_kelas], (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    }

  static findByPresensi(id_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        `SELECT 
        mapel.nama_mapel AS mapel,
        materi.nama_materi,
        materi.id_materi,
        "user".nama AS nama_guru,
        kelas.id_kelas,
        kelas.tingkat,
        jurusan.akronim,
        kelas.no_kelas,
        presensi.created_at 
        FROM presensi 
        INNER JOIN mapel ON presensi.id_mapel = mapel.id_mapel
        INNER JOIN materi ON presensi.id_materi = materi.id_materi 
        INNER JOIN "user" ON presensi.id_user = "user".id_user 
        INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas 
        INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan
        WHERE presensi.id_presensi = $1`;

      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = Presensi;
