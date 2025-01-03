const Jurusan = require("../models/jurusan")

module.exports = {
    async index(req, res) {
        const data = await Jurusan.all();

        if(!data){
            return res.status(400).json({ message: 'error!!' });
        }

        return res.status(200).json({ data });
    }
}