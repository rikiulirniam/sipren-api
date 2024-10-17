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
    }
}