const Presensi = require("../models/presensi")

module.exports = {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    async index(req, res) {
        const data = await Presensi.all();

        return res.status(200).json({ data });
    },

    async create(req, res){
        const {id_materi, id_guru, id_kelas, deskripsi} = req.body;

        const data = await Presensi.create([id_materi, id_guru, id_kelas, deskripsi]);

        res.status(200).json({
            message: "berhasil input presensi"
        })
    }
}