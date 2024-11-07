const db = require("../utils/db")

class Siswa{
    static all(){
        return new Promise((resolve, reject)=> {
            let q = "SELECT siswa.nis, siswa.rfid, siswa.nama, siswa.jenis_kelamin, siswa.tempat_lahir, siswa.tanggal_lahir, siswa.alamat, siswa.no_hp, jurusan.akronim, kelas.tingkat, kelas.no_kelas, siswa.create_date, siswa.update_date FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan";

            db.query(q, (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static create(values){
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO siswa(nis, rfid, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, no_hp, id_kelas) VALUES (?)";

            db.query(q, [values], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static update(rfid, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, no_hp, id_kelas, nis){
        return new Promise((resolve, reject) => {
            let q = "UPDATE siswa SET rfid = ?, nama = ?, jenis_kelamin = ?, tempat_lahir = ?, tanggal_lahir = ?, alamat = ?, no_hp = ?, id_kelas = ? WHERE nis = ?";

            db.query(q, [rfid, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, no_hp, id_kelas, nis], (err,res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static delete(nis){
        return new Promise((resolve, reject) => {
            let q = "DELETE FROM siswa WHERE nis = ?";
            db.query(q, [nis], (err, ers) => {
                if(err) reject(err)
                else resolve(res)
            })
        })
    }

    static find(rfid){
        return new Promise((resolve, reject) => {
            let q = "SELECT siswa.nis, siswa.rfid, siswa.nama, siswa.jenis_kelamin, siswa.tempat_lahir, siswa.tanggal_lahir, siswa.alamat, siswa.no_hp, jurusan.akronim, kelas.tingkat, kelas.no_kelas, siswa.create_date, siswa.update_date FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan WHERE siswa.rfid = ?";

            db.query(q, [rfid], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
}

module.exports = Siswa;