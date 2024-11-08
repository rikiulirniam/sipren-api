const db = require("../utils/db");

class Siswa {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT siswa.nis, siswa.rfid, siswa.nama, siswa.jenis_kelamin, jurusan.akronim, kelas.tingkat, kelas.no_kelas, siswa.create_date, siswa.update_date FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan";

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static create(values) {
    return new Promise((resolve, reject) => {
      let q =
        "INSERT INTO siswa(nis, rfid, nama, jenis_kelamin, no_hp, id_kelas) VALUES (?)";

      db.query(q, [values], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static update(rfid, nama, jenis_kelamin, nis) {
    return new Promise((resolve, reject) => {
      let q =
        "UPDATE siswa SET rfid = ?, nama = ?, jenis_kelamin = ? WHERE nis = ?";

      db.query(q, [rfid, nama, jenis_kelamin, nis], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static delete(nis) {
    return new Promise((resolve, reject) => {
      let q = "DELETE FROM siswa WHERE nis = ?";
      db.query(q, [nis], (err, ers) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static find(nis) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          siswa.nis, 
          siswa.rfid, 
          siswa.nama, 
          siswa.jenis_kelamin, 
          jurusan.akronim, 
          kelas.tingkat, 
          kelas.no_kelas, 
          siswa.create_date, 
          siswa.update_date 
        FROM siswa 
        INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas 
        INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan 
        WHERE siswa.nis = ?
      `;

      db.query(query, [nis], (err, results) => {
        if (err) {
          console.error("Database query error:", err); // Log error untuk debugging
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Siswa;
