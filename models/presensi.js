const db = require('../utils/db');

class Presensi{
    static all(){
        return new Promise((resolve, reject) => {
            let q = "SELECT materi.nama_materi, guru.nama_guru, kelas.nama_kelas, presensi.deskripsi, presensi.hari_tanggal, presensi.create_date, presensi.update_date FROM presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi INNER JOIN guru ON presensi.id_guru = guru.id_guru INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas"

            db.query(q, (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
}

module.exports = Presensi;