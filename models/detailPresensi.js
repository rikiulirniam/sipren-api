const db = require("../utils/db");

class DetailPresensi {

  static create(id_presensi, id_siswa, keterangan, present_at) {
    return new Promise((resolve, reject) => {
      let q =
        "INSERT INTO det_presensi(id_presensi, id_siswa, keterangan, present_at) VALUES($1, $2, $3, $4)";

      db.query(q, [id_presensi, id_siswa, keterangan, present_at], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static find(id_presensi) {
    return new Promise((resolve, reject) => {
      let q = `SELECT 
      "user".nama, 
      siswa.nama, 
      det_presensi.keterangan,
      det_presensi.present_at 
      FROM det_presensi 
      INNER JOIN presensi ON det_presensi.id_presensi = presensi.id_presensi 
      INNER JOIN materi ON presensi.id_materi = materi.id_materi 
      INNER JOIN "user" ON presensi.id_user = "user".id_user 
      INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas 
      INNER JOIN siswa ON det_presensi.id_siswa = siswa.nis 
      INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan 
      WHERE det_presensi.id_presensi = $1`;
      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
      });
    });
  }

  static findById(id_detail_presensi){
    return new Promise((resolve, reject) => {
      let q = `SELECT * FROM det_presensi WHERE id_det = $1`;

      db.query(q, [id_detail_presensi], (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
  }

  static findIsPresent(id_presensi, id_siswa){
    return new Promise((resolve, reject) => {
      let q = `SELECT * FROM det_presensi WHERE id_presensi = $1 AND id_siswa = $2 `;
      db.query(q, [id_presensi, id_siswa], (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
  }

  static deleteByPresensi(id_presensi){
    return new Promise((resolve, reject) => {
      let q = `DELETE FROM det_presensi WHERE id_presexnsi = $1`;

      db.query(q, [id_presensi], (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
  }

  static updateKeterangan(keterangan, id_detail_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        `UPDATE det_presensi
          SET keterangan = $1
          WHERE id_det = $2
          `;

      db.query(q, [keterangan, id_detail_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  static present(rfid, id_presensi) {
    return new Promise((resolve, reject) => {
      let q =
        `UPDATE det_presensi
          SET keterangan = 'H'
          FROM siswa s
          WHERE det_presensi.id_siswa = s.nis AND s.rfid = $1 AND det_presensi.id_presensi = $2
          RETURNING *
          `;

      db.query(q, [rfid, id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res.rows[0].nama);
      });
    });
  }
}

module.exports = DetailPresensi;
