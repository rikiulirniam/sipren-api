const db = require("../utils/db");

class Jadwal{
    static create(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen){
        return new Promise((resolve, reject) => {
            let q = `INSERT INTO jadwal
             (id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen) 
             VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`;

             db.query(q, [id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen], (err, res) => {
                if(err) return reject(err);
                else resolve(res)
             })
        })
    }

    static update(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen, id_jadwal){
        return new Promise((resolve, reject) => {
            let q = `UPDATE jadwal SET id_kelas = $1, hari=$2, jadwal_mulai=$3, jadwal_selesai=$4, id_mapel=$5, id_ruang=$6, id_user=$7, $9 WHERE id_jadwal = $8`;

             db.query(q, [id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, id_jadwal, pecahan_absen], (err, res) => {
                if(err) return reject(err);
                else resolve(res)
             })
        })
    }



    static checkJadwal(id_kelas, hari, jadwal_selesai, jadwal_mulai, id_jadwal=null){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM jadwal
         WHERE id_kelas = $1 AND hari = $2
         AND jadwal_mulai <= $4 AND jadwal_selesai >= $3 `

         const params = [id_kelas, hari, jadwal_selesai, jadwal_mulai];

            if (id_jadwal !== null) {
            q += ` AND id_jadwal != $5`;
            params.push(id_jadwal);
            }

            q += ` LIMIT 1`;

         db.query(q, params, (err, res)=> {
            if(err) return reject(err);
            else resolve(res);
         })
        })
    }
    static checkRuangan(id_ruang, hari, jadwal_selesai, jadwal_mulai, id_jadwal = null) {
        return new Promise((resolve, reject) => {
            let q = `
            SELECT * FROM jadwal
            WHERE id_ruang = $1 AND hari = $2
            AND jadwal_mulai < $3 AND jadwal_selesai > $4
            `;

            const params = [id_ruang, hari, jadwal_selesai, jadwal_mulai];

            if (id_jadwal !== null) {
            q += ` AND id_jadwal != $5`;
            params.push(id_jadwal);
            }

            q += ` LIMIT 1`;

            db.query(q, params, (err, res) => {
            if (err) return reject(err);
            else resolve(res);
            });
        });
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
            mapel.id_mapel,
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

    static find(id_jadwal){
        return new Promise((resolve, reject) => {
            let q = `SELECT 
            jadwal.id_jadwal,
            jadwal.hari,
            jadwal.jadwal_mulai,
            jadwal.jadwal_selesai,
            jadwal.id_kelas,
            jadwal.pecahan_absen,
            kelas.tingkat,
            jurusan.akronim,
            kelas.no_kelas,
            "user".id_user,
            "user".nama AS nama_guru,
            "user".username,
            ruang.id_ruang,
            ruang.nama_ruang,
            mapel.id_mapel,
            mapel.nama_mapel
            FROM jadwal 
            INNER JOIN kelas ON jadwal.id_kelas = kelas.id_kelas
            INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan
            INNER JOIN mapel ON jadwal.id_mapel = mapel.id_mapel
            INNER JOIN "user" ON jadwal.id_user="user".id_user
            INNER JOIN ruang ON jadwal.id_ruang = ruang.id_ruang WHERE id_jadwal = $1`;
            db.query(q, [id_jadwal], (err, data)=> {
                if(err) return reject(err);
                else resolve(data.rows);
            })
        })
    }

    static all(){
        return new Promise((resolve, reject) => {
            let q= `SELECT
            jadwal.id_jadwal,
            jadwal.hari,
            jadwal.jadwal_mulai,
            jadwal.jadwal_selesai,
            jadwal.id_kelas,
            kelas.tingkat,
            jurusan.akronim,
            kelas.no_kelas,
            "user".nama AS nama_guru,
            "user".username,
            ruang.nama_ruang,
            mapel.nama_mapel
            FROM jadwal 
            INNER JOIN kelas ON jadwal.id_kelas = kelas.id_kelas
            INNER JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan
            INNER JOIN mapel ON jadwal.id_mapel = mapel.id_mapel
            INNER JOIN "user" ON jadwal.id_user="user".id_user
            INNER JOIN ruang ON jadwal.id_ruang = ruang.id_ruang`;
            db.query(q, [], (err, res) => {
                if(err) return reject(err);
                else  resolve(res)
            })
        })
    }

    static delete(id_jadwal){
        return new Promise((resolve, reject) => {
            let q = `DELETE FROM jadwal WHERE id_jadwal = $1`
            db.query(q,[id_jadwal], (err,res) =>{
                if(err)return reject(err);
                else resolve(res);
            })
        })
    }
}

module.exports = Jadwal