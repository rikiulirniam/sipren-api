const db = require("../utils/db");

class DetailPresensi {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT det_presensi.id_det, materi.nama_materi, materi.deskripsi, user.nama, kelas.tingkat, kelas.no_kelas, jurusan.akronim, presensi.deskripsi, siswa.nama, det_presensi.keterangan FROM det_presensi INNER JOIN presensi ON det_presensi.id_presensi = presensi.id_presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi INNER JOIN user ON presensi.id_user = user.id_user INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas INNER JOIN siswa ON det_presensi.id_siswa = siswa.nis INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan";

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static create(values) {
    return new Promise((resolve, reject) => {
      let q =
        "INSERT INTO det_presensi(id_presensi, id_siswa, keterangan) VALUES(?)";

      db.query(q, [values], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static find(id_presensi) {
    return new Promise((resolve, reject) => {
      let q = `SELECT det_presensi.id_det, det_presensi.id_presensi, det_presensi.id_siswa, det_presensi.keterangan, siswa.nama FROM det_presensi JOIN siswa ON det_presensi.id_siswa = siswa.nis WHERE det_presensi.id_presensi = ?`;
      db.query(q, [id_presensi], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static UpdateKeterangan(rfid){
    return new Promise((resolve, reject) => {
      let q = "UPDATE det_presensi INNER JOIN siswa s ON det_presensi.id_siswa = s.nis SET keterangan = 'H' WHERE s.rfid = ?";

      db.query(q, [rfid], (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
  }

}

module.exports = DetailPresensi;
