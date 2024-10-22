const Kelas = require("../models/kelas");

module.exports = {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async index(req, res) {
        const { id_jurusan, tingkat } = req.query;

        const data = await Kelas.all(id_jurusan, tingkat);

        return res.json({ data });
    },
    async create(req, res) {
        const { id_jurusan, tingkat, no_kelas } = req.body;

        const data = await Kelas.create([id_jurusan, tingkat, no_kelas]);

        return res.status(200).json({
            message: "berhasil insert kelas"
        })
    },
    async update(req, res) {
        const { id_kelas} = req.query;
        const { id_jurusan, tingkat, no_kelas } = req.body;

        await Kelas.update(id_jurusan, tingkat, no_kelas, id_kelas);

        return res.status(200).json({
            message: "berhasil update kelas"
        })
    },
    async delete(req, res) {
        const {id_kelas} = req.params;
        console.log(id_kelas);
        await Kelas.delete(id_kelas);

        return res.status(200).json({
            message: "berhasil delete kelas"
        })
    },
}