const db = require("../utils/db");

class Siswa {
  static all() {
    return new Promise((resolve, reject) => {
      let q =
        "SELECT siswa.nis, siswa.rfid, siswa.nama, jurusan.akronim, kelas.tingkat, kelas.no_kelas FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan";

      db.query(q, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static create(values) {
    return new Promise((resolve, reject) => {
      let q = "INSERT INTO siswa(nis, rfid, nama, id_kelas) VALUES ($1, $2, $3, $4)";

      db.query(q, values, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static update(old_nis, rfid, nama, new_nis) {
    return new Promise((resolve, reject) => {
      let q = "UPDATE siswa SET rfid = $1, nama = $2, nis = $3 WHERE nis = $4";

      db.query(q, [rfid, nama, new_nis, old_nis], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static delete(nis) {
    return new Promise((resolve, reject) => {
      let q = `DELETE FROM "siswa" WHERE "nis" = $1`;
      db.query(q, [nis], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static deleteByKelas(id_kelas) {
    return new Promise((resolve, reject) => {
      let q = `DELETE FROM "siswa" WHERE id_kelas = $1`;
      db.query(q, [id_kelas], (err, res) => {
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
          siswa.id_kelas,
          jurusan.akronim, 
          kelas.tingkat, 
          kelas.no_kelas
        FROM siswa 
        INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas 
        INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan 
        WHERE siswa.nis = $1
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

  static findByRfid(rfid){
    return new Promise((resolve, reject) => {
      const q =  `SELECT * FROM siswa WHERE siswa.rfid = $1`

      db.query(q, [rfid], (err, res)=>{
        if(err) reject(err);
        else resolve(res);
      })
    })
  }


  static findByKelas(id_kelas) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          siswa.nis, 
          siswa.rfid, 
          siswa.nama
        FROM siswa 
        WHERE siswa.id_kelas = $1
      `;

      db.query(query, [id_kelas], (err, results) => {
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
