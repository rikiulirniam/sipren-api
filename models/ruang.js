const db = require("../utils/db");

class Ruang{
    static all(){
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM ruang`;
            db.query(q, [], (err, res) => {
                if(err) return reject(err);
                else resolve(res.rows);
            })
        })
    }
}

module.exports = Ruang