const db = require('../utils/db');

class siswa{
    static all(){
        return new Promise((resolve, reject) => {
            let q = 'SELECT * FROM siswa';

            db.query(q, (err, res) => {
                if(err) reject(err);
                else resolve(res)
            });
        });
        }

    static create(value){
        return new Promise((resolve, reject) => {
            let q = 'INSERT INTO siswa(`rfid`, `nama`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir` ,`alamat`,`no_hp`,`id_kelas`) VALUES (?)';

            db.query(q, [value], (err, data) => {
                if (err) reject(err);

                resolve(data);
            }) 
        })
    }

    static update(nis, updateSiswa){
        return new Promise((resolve, reject) => {
            let q = 'UPDATE siswa set ? WHERE nis = ?';

            db.query(q, [updateSiswa, nis], (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static delete(nis){
        return new Promise((resolve, reject) => {
            let q = 'DELETE FROM siswa where nis = ?';

            db.query(q, [nis], (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
    }

module.exports = siswa;