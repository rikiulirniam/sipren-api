const Ruang = require("../models/ruang")

module.exports = {
    async all(req, res){
        const data = await Ruang.all();
        return res.status(200).json({data})
    }
}