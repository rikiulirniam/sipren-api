const db = require("../utils/db")

class Guru{
    static all(){
        return new Promise((resolve, reject) => {
            let q = "SELECT * FROM guru";

            db.query(q, (err, res)=> {
                if(err) reject(err);
                else resolve(res);
            });
        })
    }

    static find(id_user){
        return new Promise((resolve, reject) => {
            let q = "SELECT * FROM guru WHERE id_user = '?'"

            db.query(q, [id_user], (err, res)=> {
                if(err) reject(err);
                else resolve(res);
            });
        })
    }

    static create(values){
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO guru(`id_user`, `nama_guru`, `no_hp`, create_date) VALUES (?)"
            
            db.query(q, [values], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })

    }

    static update(id_guru, nama_guru, no_hp, update_date){
        return new Promise((resolve, reject) => {
            let q = "UPDATE guru SET nama_guru = '?', no_hp = '?', update_date = ? WHERE id_guru = ?";

            db.query(q, [nama_guru, no_hp, update_date, id_guru], (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }
}

module.exports = Guru;