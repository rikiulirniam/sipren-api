const db = require('../utils/db');

class DetailPresensi{
    static all(){
        return new Promise((resolve, reject) => {
            let q = "SELECT det_presensi.id_det, materi.nama_materi, materi.deskripsi, guru.nama_guru, kelas.tingkat, kelas.no_kelas, jurusan.akronim, presensi.deskripsi, siswa.nama, det_presensi.keterangan FROM det_presensi INNER JOIN presensi ON det_presensi.id_presensi = presensi.id_presensi INNER JOIN materi ON presensi.id_materi = materi.id_materi INNER JOIN guru ON presensi.id_guru = guru.id_guru INNER JOIN kelas ON presensi.id_kelas = kelas.id_kelas INNER JOIN siswa ON det_presensi.id_siswa = siswa.nis INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan";

            db.query(q, (err, res) => {
                if(err) reject(err)
                else resolve(res);
            })
        })
    }

    static create(values){
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO det_presensi(id_presensi, id_siswa, keterangan) VALUES(?)"

            db.query(q, [values], (err, res) => {
                if(err) reject(err)
                else resolve(res);
            })
        })
    }
}

module.exports = DetailPresensi