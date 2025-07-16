const db = require("../utils/db");

class Presensi {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        `SELECT 
        presensi.id_presensi,
        mapel.nama_mapel,
        materi.nama_materi,
         materi.deskripsi,
        "user".nama,
        "user".username,
         kelas.id_kelas ,
         kelas.no_kelas,
          jurusan.akronim,
          kelas.tingkat,
          presensi.id_presensi,
          presensi.presensi_mulai,
          presensi.presensi_selesai
          FROM presensi 
          INNER JOIN materi 
          ON presensi.id_materi = materi.id_materi 
          INNER JOIN jadwal ON presensi.id_jadwal = jadwal.id_jadwal
          INNER JOIN "user" ON jadwal.id_user = "user".id_user 
          INNER JOIN kelas 
          ON jadwal.id_kelas = kelas.id_kelas 
          INNER JOIN mapel ON jadwal.id_mapel = mapel.id_mapel
          INNER JOIN jurusan 
          ON kelas.id_jurusan = jurusan.id_jurusan`;

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
      });
    });
  }

  static create(id_materi, id_jadwal, presensi_mulai) {
    return new Promise((resolve, reject) => {
      let q =
        `INSERT INTO presensi(id_materi, id_jadwal, presensi_mulai) VALUES($1, $2, $3) RETURNING *`;

      db.query(q, [id_materi, id_jadwal, presensi_mulai], (err, res) => {
        if (err) reject(err);

        if (res) {
          resolve(res.rows[0].id_presensi);
        } else {
          reject(new Error("tidak dapat mengembalikan id"));
        }
      });
    });
  }

  static update(id_mapel, presensi_mulai, presensi_selesai, id_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        "UPDATE presensi SET id_mapel = $1, presensi_mulai = $2, presensi_selesai = $3 WHERE id_presensi = $4";

      db.query(
        q,
        [id_mapel, presensi_mulai, presensi_selesai, id_presensi],
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

    static findByUser(id_user) {
      return new Promise((resolve, reject) => {
        let q =
          `SELECT 
        presensi.id_presensi,
        mapel.nama_mapel,
        materi.nama_materi,
         materi.deskripsi,
         kelas.id_kelas ,
         kelas.no_kelas,
          jurusan.akronim,
          kelas.tingkat,
          presensi.id_presensi,
          presensi.presensi_mulai,
          presensi.presensi_selesai
          FROM presensi 
          INNER JOIN materi 
          ON presensi.id_materi = materi.id_materi 
          INNER JOIN jadwal ON presensi.id_jadwal = jadwal.id_jadwal
          INNER JOIN "user" ON jadwal.id_user = "user".id_user 
          INNER JOIN kelas 
          ON jadwal.id_kelas = kelas.id_kelas 
          INNER JOIN mapel ON jadwal.id_mapel = mapel.id_mapel
          INNER JOIN jurusan 
          ON kelas.id_jurusan = jurusan.id_jurusan
          WHERE "user".id_user = $1`;

        db.query(q, [id_user], (err, res) => {
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
        materi.deskripsi,
        materi.id_materi,
        "user".nama AS nama_guru,
        kelas.id_kelas,
        kelas.tingkat,
        jurusan.akronim,
        kelas.no_kelas,
        presensi.presensi_mulai,
        presensi.presensi_selesai
        FROM presensi 
        INNER JOIN jadwal ON presensi.id_jadwal = jadwal.id_jadwal
        INNER JOIN mapel ON jadwal.id_mapel = mapel.id_mapel
        INNER JOIN materi ON presensi.id_materi = materi.id_materi 
        INNER JOIN "user" ON jadwal.id_user = "user".id_user 
        INNER JOIN kelas ON jadwal.id_kelas = kelas.id_kelas 
        INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan
        WHERE presensi.id_presensi = $1`;

      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static findPresensiByJadwal(id_jadwal){
    return new Promise((resolve, reject) => {
      let q = `SELECT presensi_selesai FROM presensi WHERE id_jadwal = $1
              ORDER BY presensi_mulai DESC
              LIMIT 1;
              `
      db.query(q, [id_jadwal], (err, res) => {
        if(err) return reject(err);
        else resolve(res.rows[0])
      })
    })
  }

  static find(id_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        `SELECT 
        id_presensi FROM presensi WHERE presensi.id_presensi = $1`;

      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
      });
    });
  }

  static end(id_presensi, presensi_selesai) {
    return new Promise((resolve, reject) => {
      let q =
        `UPDATE presensi SET presensi_selesai = $2 WHERE presensi.id_presensi = $1`;

      db.query(q, [id_presensi, presensi_selesai], (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
      });
    });
  }


}

module.exports = Presensi;
