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

    static create(values){
        return new Promise((resolve, reject) => {
            let q = "INSERT INTO guru(`nama_guru`, `no_hp`, create_date) VALUES (?)"
            
            
            db.query(q, [values], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })

    }
}

module.exports = Guru;