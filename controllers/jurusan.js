const Jurusan = require("../models/jurusan")

module.exports = {
    async index(req, res) {
        const data = await Jurusan.all();

        if(!data.rows){
            return res.status(400).json({ message: 'Data tidak ditemukan' });
        }

        return res.status(200).json({ data: data.rows });
    }
}