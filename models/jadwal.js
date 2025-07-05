const db = require("../utils/db");

class Jadwal{
    static create(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user){
        return new Promise((resolve, reject) => {
            let q = `INSERT INTO jadwal
             (id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`;

             db.query(q, [id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user], (err, res) => {
                if(err) return reject(err);
                else resolve(res)
             })
        })
    }

    static checkJadwal(id_kelas, hari, jadwal_selesai, jadwal_mulai){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM jadwal
         WHERE id_kelas = $1 AND hari = $2
         AND jadwal_mulai <= $4 AND jadwal_selesai >= $3
         LIMIT 1`

         db.query(q, [id_kelas, hari, jadwal_selesai, jadwal_mulai], (err, res)=> {
            if(err) return reject(err);
            else resolve(res);
         })
        })
    }

    static checkRuangan(id_ruang, hari, jadwal_selesai, jadwal_mulai){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM jadwal
         WHERE id_ruang = $1 AND hari = $2
         AND jadwal_mulai <= $4 AND jadwal_selesai >= $3
         LIMIT 1`;

          db.query(q, [id_ruang, hari, jadwal_selesai, jadwal_mulai], (err, res)=> {
            if(err) return reject(err);
            else resolve(res);
         })

        })
    }
    static findByUser(id_user, hari){
        return new Promise((resolve, reject) => {
            let q = `
            SELECT
            jadwal.id_jadwal,
            jadwal.hari,
            jadwal.jadwal_mulai,
            jadwal.jadwal_selesai,
            jadwal.id_kelas,
            kelas.tingkat,
            jurusan.akronim,
            kelas.no_kelas,
            ruang.nama_ruang,
            mapel.nama_mapel
            FROM jadwal 
            INNER JOIN kelas ON jadwal.id_kelas = kelas.id_kelas
            INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan
            INNER JOIN mapel ON jadwal.id_mapel = mapel.id_mapel
            INNER JOIN ruang ON jadwal.id_ruang = ruang.id_ruang
            WHERE jadwal.id_user = $1 AND jadwal.hari = $2
            `

            db.query(q, [id_user, hari], (err, res) =>{
                if(err) return reject(err);
                else resolve(res.rows);
            })
        })
    }
}

module.exports = Jadwal