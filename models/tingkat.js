const db = require("../utils/db");

class Tingkat{
    static all(){
        return new Promise((resolve, reject)=> {
            let q = "SELECT * FROM tingkat"

            db.query(q, (err, res)=> {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
}

module.exports= Tingkat;