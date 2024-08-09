const Guru = require("../models/guru");

module.exports = {
    async index(req, res){
        const data = await Guru.all();

        return res.status(200).json({ data });
    }
}