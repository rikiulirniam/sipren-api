const Materi = require("../models/materi");

module.exports = {
    async index() {

    },
    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async store(req, res) {
        const { id_mapel, nama_materi, deskripsi } = req.body;
        if(!id_mapel || !nama_materi || !deskripsi){
            return res.status(400).json({ message: 'error!!' });
        }

        const data = await Materi.create([id_mapel, nama_materi, deskripsi]);

        return res.status(201).json({
            message: "Berhasil Tambah Materi",
            data: {
                insertId: data.insertId
            },
            status: 201
        });
    },
    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async show(req, res) {
        const { id_materi } = req.params;
        if(!id_materi){
            return res.status(400).json({ message: 'error!!' });
        }

        const data = await Materi.show(id_materi);

        return res.status(200).json({
            message: 'Berhasil Mendapatkan Materi',
            data,
            status: 200
        });
    }
}