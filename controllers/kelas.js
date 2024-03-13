const Kelas = require("../models/kelas");

module.exports = {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async index(req, res) {
        const { id_jurusan, id_tingkat } = req.query;

        const data = await Kelas.all(id_jurusan, id_tingkat);

        return res.json({ data });
    }
}