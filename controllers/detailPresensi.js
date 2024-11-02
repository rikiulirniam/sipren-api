const DetailPresensi = require("../models/detailPresensi");

module.exports = {
    async all(req, res){
        const data = await DetailPresensi.all();

        return res.status(200).json({
            data
        })
    }, 

    async create(req, res){
        const {id_presensi, id_siswa, keterangan} = req.body;

        await DetailPresensi.create([id_presensi, id_siswa, keterangan]);

        return res.status(200).json({
            message: "berhasil create detail presensi"
        })
    }
}