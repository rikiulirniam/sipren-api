const db = require("../utils/db");

function Jurusan(jurusan) {
    this.nama_jurusan = jurusan.nama_jurusan;
    this.akronim = jurusan.akronim;
} 

Jurusan.all = (params, result) => {
    let query = "SELECT * FROM jurusan";

    db.query(query, (err, res) => {
        if(err){
            result(null, err);
            return;
        }

        result(null, res);
    });
}

module.exports = Jurusan;