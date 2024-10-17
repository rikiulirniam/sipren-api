const db = require("../utils/db")

class Siswa{
    static all(){
        return new Promise((resolve, reject)=> {
            let q = "SELECT siswa.nis, siswa.rfid, siswa.nama, siswa.jenis_kelamin, siswa.tempat_lahir, siswa.tanggal_lahir, siswa.alamat, siswa.no_hp, kelas.no_kelas, siswa.create_date, siswa.update_date FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas"

            db.query(q, (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
}

module.exports = Siswa;