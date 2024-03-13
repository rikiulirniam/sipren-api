const db = require("../utils/db");

class Jurusan{
    static all(){
        return new Promise((resolve, reject) => {
            let q = "SELECT * FROM jurusan";

            db.query(q, (err, res) => {
                if(err) reject(err);
                else resolve(res);
            });
        })
    }
}

module.exports = Jurusan;