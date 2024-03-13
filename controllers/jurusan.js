const Jurusan = require("../models/jurusan")

module.exports = {
    async index(req, res) {
        const data = await Jurusan.all();

        return res.status(200).json({ data });
    }
}